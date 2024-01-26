package requests

type CreateTestCasesRequest struct {
	QnId      string `json:"qnid,omitempty" validate:"required"`
	TestCases []SingleTestCase `json:"testcases,omitempty" validate:"required"`
}

type SingleTestCase struct {
	// Define fields for each test case
	// For example:
	Input  string `json:"input,omitempty"`
	Output string `json:"output,omitempty"`
	// Add more fields as needed
}
