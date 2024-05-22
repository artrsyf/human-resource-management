package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	ID      primitive.ObjectID `json:"id" bson:"_id"`
	Name    string             `json:"name" bson:"name"`
	Account string             `json:"account" bson:"account"`
	Email   string             `json:"email" bson:"email"`
	Group   string             `json:"group" bson:"group"`
	Number  string             `json:"number" bson:"number"`
}
