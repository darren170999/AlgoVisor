package requests

// import "go.mongodb.org/mongo-driver/bson/primitive"

type DeleteSubscriberRequest struct {
	Email    string `json:"email,omitempty" validate:"required"`
}
