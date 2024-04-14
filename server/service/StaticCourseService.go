package service

import (
	"server/data/requests"
	"server/data/responses"
)

type StaticCourseService interface {
	//CRUD for AccountsManagement
	Create(courses requests.CreateCoursesRequest)
	Update(courses requests.UpdateCoursesRequest)
	FindAll() []responses.CourseResponse

}
