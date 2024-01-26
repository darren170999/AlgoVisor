package requests

// import "go.mongodb.org/mongo-driver/bson/primitive"

type DeleteQuestionRequest struct {
	QnId   string             `validate:"required,max=200,min=1" json:"qnid"`
}
