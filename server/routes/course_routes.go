package routes

import (
	"server/controllers"

	"github.com/gin-gonic/gin"
)

func CourseRoute(router *gin.Engine) {
	// Main Endpoints
	router.POST("/course/create", controllers.CreateCourse())
	router.GET("/courses", controllers.GetAllCourses())
	//Swagger Endpoints
	router.POST("/api/course/create", controllers.CreateCourse())
	router.GET("/api/courses", controllers.GetAllCourses())
}