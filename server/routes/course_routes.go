package routes

import (
	"server/controllers"

	"github.com/gin-gonic/gin"
)

func CourseRoute(router *gin.Engine) {
	// Main Endpoints
	router.POST("/course/create", controllers.CreateCourse())
	router.POST("/course/create/video", controllers.CreateVideo())
	router.GET("/course/video/:filename", controllers.GetVideo())
	router.GET("/courses", controllers.GetAllCourses())

	//Swagger Endpoints
	router.POST("/api/course/create", controllers.CreateCourse())
	router.POST("/api/course/create/video", controllers.CreateVideo())
	router.GET("/api/courses", controllers.GetAllCourses())
}