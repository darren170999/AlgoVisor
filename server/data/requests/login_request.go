package requests

// import "go.mongodb.org/mongo-driver/bson/primitive"

type LoginRequest struct {
	// Id primitive.ObjectID `json:"id,omitempty"`
	UserName string `json:"userName,omitempty" validate:"required"`
	Password string `json:"password,omitempty" validate:"required"`
}
