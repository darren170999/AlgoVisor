package routes

import (
	"server/controllers"

	"github.com/gin-gonic/gin"
)

func CourseRoute(router *gin.Engine) {
	// Main Endpoints
	router.POST("/course", controllers.CreateCourse())
	router.GET("/courses", controllers.GetAllCourses())
	//Swagger Endpoints
	router.POST("/api/course", controllers.CreateCourse())
	router.GET("/api/courses", controllers.GetAllCourses())
}