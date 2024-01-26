package requests

type EditTestCasesRequest struct {
	QnId      string `json:"qnid,omitempty" validate:"required"`
	TestCases []SingleTestCase `json:"testcases,omitempty" validate:"required"`
}
