package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Tutorial struct {
	Id          primitive.ObjectID `json:"id,omitempty"`
	QnId        string             `json:"qnid,omitempty" validate:"required"`
	Name        string             `json:"name,omitempty" validate:"required"`
	Description string             `json:"description,omitempty" validate:"required"`
	Examples    string             `json:"examples,omitempty" validate:"required"`
	Constraints string             `json:"constraints,omitempty" validate:"required"`
	Status      string             `json:"status,omitempty" validate:"required"`
	Tags        string             `json:"tags,omitempty" validate:"required"`
}
