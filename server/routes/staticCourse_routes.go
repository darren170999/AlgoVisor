package routes

import (
	"server/controllers"

	"github.com/gin-gonic/gin"
)

func StaticCourseRoute(router *gin.Engine) {
	// Main Endpoints
	router.POST("/staticcourses/create", controllers.CreateStaticCourse())
	router.GET("/staticcourses", controllers.GetAllStaticCourses())
	router.DELETE("/staticcourses/:name", controllers.DeleteAStaticCourse())

}
