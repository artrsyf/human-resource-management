package faker

import (
	"back/pkg/models"
	"context"
	"log"

	"github.com/brianvoe/gofakeit/v6"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func CreateAndInsertManyUsers(usersCollection *mongo.Collection) {
	users := []interface{}{}

	for i := 0; i < 500; i++ {
		user := models.User{
			ID:      primitive.NewObjectID(),
			Name:    gofakeit.Name(),
			Account: gofakeit.Username(),
			Email:   gofakeit.Email(),
			Group:   gofakeit.RandomString([]string{"Management", "HR", "Accounting", "Engineering", ""}),
			Number:  gofakeit.PhoneFormatted(),
		}
		users = append(users, &user)
	}

	result, err := usersCollection.InsertMany(context.Background(), users)
	if err != nil {
		log.Fatal(err)
	}

	log.Printf("%d users were inserted\n", len(result.InsertedIDs))
}
