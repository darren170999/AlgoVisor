package requests

import "go.mongodb.org/mongo-driver/bson/primitive"

type UpdateUsersRequest struct {
	Id       primitive.ObjectID `json:"id,omitempty"`
	Name     string             `validate:"required,max=200,min=1" json:"name"`
	Email    string             `json:"email,omitempty" validate:"required"`
	Title    string             `json:"title,omitempty" validate:"required"`
	Password string             `json:"password,omitempty" validate:"required"`
}
