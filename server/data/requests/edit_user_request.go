package requests

import "go.mongodb.org/mongo-driver/bson/primitive"

type EditUserRequest struct {
	Id       primitive.ObjectID `json:"id,omitempty"`
	Name     string             `validate:"required,min=1,max=200" json:"name"`
	Password string             `json:"password,omitempty" validate:"required"`
	Email    string             `json:"email,omitempty" validate:"required"`
	Title    string             `json:"title,omitempty" validate:"required"`
}
