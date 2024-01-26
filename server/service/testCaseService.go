package service

import (
	"server/data/requests"
	"server/data/responses"
)

type TestCaseService interface {
	Create(testCases requests.CreateTestCasesRequest)
	Update(testCases requests.UpdateTestCasesRequest)
	Delete(QnId int)
	FindById(QnId int) responses.TestCasesResponse
	FindAll() []responses.TestCasesResponse

}