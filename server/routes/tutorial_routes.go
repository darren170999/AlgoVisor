package routes

import (
	"server/controllers"

	"github.com/gin-gonic/gin"
)

func TutorialRoute(router *gin.Engine) {
	//All routes related to users comes here
	router.POST("/tutorials/code/create", controllers.CreateQuestion())
	router.GET("/tutorials/code/:qnid", controllers.GetAQuestion())
	router.PUT("/tutorials/code/:qnid", controllers.EditAQuestion())
	router.DELETE("/tutorials/code/:qnid", controllers.DeleteAQuestion())
	router.GET("/tutorials", controllers.GetAllQn())
	// Swagger API testing
	router.POST("/api/tutorials/code/create", controllers.CreateQuestion())
	router.GET("/api/tutorials/code/:qnid", controllers.GetAQuestion())
	router.PUT("/api/tutorials/code/:qnid", controllers.EditAQuestion())
	router.DELETE("/api/tutorials/code/:qnid", controllers.DeleteAQuestion())
	router.GET("/api/tutorials", controllers.GetAllQn())
	
}
