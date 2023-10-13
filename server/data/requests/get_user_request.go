package requests

// import "go.mongodb.org/mongo-driver/bson/primitive"

type GetUserRequest struct {
	// Id primitive.ObjectID `json:"id,omitempty"`
	MatricNum string `json:"matricNum,omitempty" validate:"required"`
	Password  string `json:"password,omitempty" validate:"required"`
}
