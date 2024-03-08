package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Subscriber struct {
	Id       primitive.ObjectID `json:"id,omitempty"`
	Email    string             `json:"email,omitempty" validate:"required"`
	// UserName string             `json:"userName,omitempty" validate:"required"`
}
