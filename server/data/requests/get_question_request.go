package requests

// import "go.mongodb.org/mongo-driver/bson/primitive"

type GetQuestionRequest struct {
	// Id primitive.ObjectID `json:"id,omitempty"`
	QnId string `json:"qnId,omitempty" validate:"required"`
	Name string `json:"name,omitempty" validate:"required"`
}
