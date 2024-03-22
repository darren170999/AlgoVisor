package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Settings struct {
	Id            primitive.ObjectID `json:"id,omitempty"`
	ChatGPTApiKey string             `json:"chatgptapikey,omitempty" validate:"required"`
}
