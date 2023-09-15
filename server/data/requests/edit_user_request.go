package requests

import "go.mongodb.org/mongo-driver/bson/primitive"

type EditUserRequest struct {
	Id       primitive.ObjectID `json:"id,omitempty"`
	Name     string             `validate:"required,min=1,max=200" json:"name"`
	Location string             `json:"location,omitempty" validate:"required"`
	Title    string             `json:"title,omitempty" validate:"required"`
}
