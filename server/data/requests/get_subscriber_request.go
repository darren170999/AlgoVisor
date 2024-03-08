package requests

// import "go.mongodb.org/mongo-driver/bson/primitive"

type GetSubscriberRequest struct {
	// Id primitive.ObjectID `json:"id,omitempty"`
	Email string `json:"email,omitempty" validate:"required"`
}
