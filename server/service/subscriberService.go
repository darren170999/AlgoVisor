package service

import (
	"server/data/requests"
	"server/data/responses"
)

type SubscriberService interface {
	//CRUD for AccountsManagement
	Create(subcribers requests.CreateSubscriberRequest)
	Delete(email string)
	FindAll() []responses.SubscriberResponse
	FindAllAndNotify() []responses.SubscriberResponse
}
