package requests

import "go.mongodb.org/mongo-driver/bson/primitive"

type UpdateQuestionRequest struct {
	Id          primitive.ObjectID `json:"id,omitempty"`
	QnId        string             `validate:"required,max=200,min=1" json:"qnid"`
	Name        string             `validate:"required,max=200,min=1" json:"name"`
	Description string             `json:"description,omitempty" validate:"required"`
	Examples    string             `json:"examples,omitempty" validate:"required"`
	Constraints string             `json:"constraints,omitempty" validate:"required"`
	Status      string             `json:"status,omitempty" validate:"required"`
	Tags        string             `json:"tags,omitempty" validate:"required"`
}
