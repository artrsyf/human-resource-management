package main

import (
	"back/pkg/User/delivery"
	userRepository "back/pkg/User/repository/mongo"
	"back/pkg/faker"
	"back/pkg/logger"
	"context"
	"fmt"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"gopkg.in/yaml.v2"
)

const configPath = "config.yaml"

type Config struct {
	Port int `yaml:"PORT"`
}

var AppConfig *Config

func main() {
	logger.Init()

	err := godotenv.Load()
	if err != nil {
		logger.Logger.Fatal("error loading .env file:", err)
	}

	configFile, err := os.Open(configPath)
	if err != nil {
		logger.Logger.Fatal("error opening config file:", err)
	}

	decoder := yaml.NewDecoder(configFile)
	err = decoder.Decode(&AppConfig)
	if err != nil {
		logger.Logger.Fatal("error reading config file:", err)
	}

	ctx := context.Background()
	mongoURI := fmt.Sprintf("mongodb://%s:%s@%s:%s/?maxPoolSize=10",
		os.Getenv("MONGODB_USER"),
		os.Getenv("MONGODB_PASSWORD"),
		os.Getenv("MONGODB_HOST"),
		os.Getenv("MONGODB_PORT"),
	)
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(mongoURI).SetServerAPIOptions(serverAPI)

	mongoConnect, err := mongo.Connect(ctx, opts)
	if err != nil {
		panic(err)
	}
	mongoDB := mongoConnect.Database(os.Getenv("MONGODB_DATABASE"))
	usersCollection := mongoDB.Collection("users")

	faker.CreateAndInsertManyUsers(usersCollection)

	defer func() {
		configFile.Close()

		if err := mongoConnect.Disconnect(ctx); err != nil {
			panic(err)
		}
	}()

	router := mux.NewRouter()

	userRepo := userRepository.NewUserMongoRepository(usersCollection)

	userHandler := delivery.UserHandler{
		UserRepo: userRepo,
	}

	router.Handle("/api/users",
		http.HandlerFunc(userHandler.GetAllUsers)).Methods("GET")

	corsRouter := cors.Default().Handler(router)

	logger.Logger.Printf("starting server at http://127.0.0.1:%d", AppConfig.Port)
	logger.Logger.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", AppConfig.Port), corsRouter))
}
