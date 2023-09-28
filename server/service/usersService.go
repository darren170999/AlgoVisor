package service

import (
	"server/data/requests"
	"server/data/responses"
)

type UsersService interface {
	//CRUD for AccountsManagement
	Create(users requests.CreateUsersRequest)
	Update(users requests.UpdateUsersRequest)
	Delete(userId int)
	FindById(userId int) responses.UserResponse
	FindAll() []responses.UserResponse
}
