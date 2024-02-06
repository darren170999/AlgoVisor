package requests

type GetTestCasesRequest struct {
	QnId            string           `json:"qnid,omitempty" validate:"required"`
	TestCases       []SingleTestCase `json:"testcases,omitempty" validate:"required"`
	HiddenTestCases []SingleTestCase `json:"hiddentestcases,omitempty" validate:"required"`
}
