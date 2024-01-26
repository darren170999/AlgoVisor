package requests

// import "go.mongodb.org/mongo-driver/bson/primitive"

type DeleteTestCasesRequest struct {
	QnId   string             `validate:"required,max=200,min=1" json:"qnid"`
}