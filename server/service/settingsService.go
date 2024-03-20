package service

import (
	"server/data/responses"
)

type SettingsService interface {
	//CRUD for AccountsManagement
	FindAll() []responses.Response

}
