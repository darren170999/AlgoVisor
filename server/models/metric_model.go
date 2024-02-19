package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Metric struct {
	Id     primitive.ObjectID `json:"id,omitempty"`
	QnId   string             `json:"qnid,omitempty" validate:"required"`
	Speed  float32            `json:"speed,omitempty" validate:"required"`
	Memory int                `json:"memory,omitempty" validate:"required"`
}
