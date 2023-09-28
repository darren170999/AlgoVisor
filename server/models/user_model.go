package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	Id       primitive.ObjectID `json:"id,omitempty"`
	Name     string             `json:"name,omitempty" validate:"required"`
	Title    string             `json:"title,omitempty" validate:"required"`
	Email	 string 			`json:"email,omitempty" validate:"required"`
	MatricNum string 			`json:"marticNum,omitempty" validate:"required"`
}
