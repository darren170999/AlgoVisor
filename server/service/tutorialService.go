package service

import (
	"server/data/requests"
	"server/data/responses"
)

type TutorialService interface {
	Create(tutorial requests.CreateQuestionRequest)
	Update(tutorial requests.UpdateQuestionRequest)
	Delete(QnId int)
	FindById(QnId int) responses.TutorialResponse
	FindAll() []responses.TutorialResponse

}