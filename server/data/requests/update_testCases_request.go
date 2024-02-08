package requests

import "go.mongodb.org/mongo-driver/bson/primitive"

type UpdateTestCasesRequest struct {
	Id        primitive.ObjectID `json:"id,omitempty"`
	QnId      string             `validate:"required,max=200,min=1" json:"qnid"`
	TestCases []SingleTestCase   `json:"testcases"`
	HiddenTestCases []SingleTestCase `json:"hiddentestcases,omitempty" validate:"required"`
}
