package requests

type GetTestCasesRequest struct {
	QnId      string `json:"qnid,omitempty" validate:"required"`
	TestCases []SingleTestCase `json:"testcases,omitempty" validate:"required"`
}
