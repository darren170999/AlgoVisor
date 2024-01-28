package service

import (
	"server/data/requests"
	"server/data/responses"
)

type AttemptService interface {
	Create(attempt requests.CreateAttemptRequest)
	Update(attempt requests.UpdateAttemptRequest)
	FindByIdandUsername(QnId int, Username string) responses.AttemptResponse
	FindAll() []responses.AttemptResponse
}