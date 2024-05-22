package mongo

import (
	"back/pkg/models"
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type UserMongoRepository struct {
	DB *mongo.Collection
}

func NewUserMongoRepository(db *mongo.Collection) *UserMongoRepository {
	return &UserMongoRepository{
		DB: db,
	}
}

func (repo *UserMongoRepository) GetUsersFromRepo() ([]*models.User, error) {
	users := []*models.User{}

	filter := bson.M{}

	cursor, err := repo.DB.Find(context.Background(), filter)
	if err != nil {
		return nil, err
	}

	err = cursor.All(context.Background(), &users)
	if err != nil {
		return nil, err
	}

	return users, nil
}
