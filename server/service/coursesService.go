package service

import (
	"server/data/requests"
	"server/data/responses"
)

type CoursesService interface {
	//CRUD for AccountsManagement
	Create(courses requests.CreateCoursesRequest)
	// Update(courses requests.UpdateUsersRequest)
	// Delete(userId int)
	// FindById(userId int) responses.UserResponse
	FindAll() []responses.CourseResponse

}
