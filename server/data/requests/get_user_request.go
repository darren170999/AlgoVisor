package requests

import "go.mongodb.org/mongo-driver/bson/primitive"

type GetUserRequest struct {
	Id primitive.ObjectID `json:"id,omitempty"`
}
