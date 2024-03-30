package routes

import (
	"server/controllers"

	"github.com/gin-gonic/gin"
)

func AttemptRoute(router *gin.Engine) {
	//All routes related to users comes here
	router.POST("/tutorials/code/attempt/create", controllers.CreateAttempt())
	router.GET("/tutorials/code/attempt/:qnid/:language/:username", controllers.GetAttemptByQnIdByUsername())
	router.GET("/tutorials/code/check/:username", controllers.GetAllAttemptsByUsername())
	router.PUT("/tutorials/code/attempt/:qnid/:language/:username", controllers.UpdateAttempt())
	router.PUT("/tutorials/code/attempt/status/:qnid/:language/:username", controllers.UpdateStatus())
	router.GET("/tutorials/code/attempt", controllers.GetAllAttempts())
	// Swagger API testing
	// router.POST("/api/tutorials/code/attempt/create", controllers.CreateAttempt())
	// router.GET("/api/tutorials/code/attempt/:qnid/:language/:username", controllers.GetAttemptByQnIdByUsername())
	// router.GET("/api/tutorials/code/check/:username", controllers.GetAllAttemptsByUsername())
	// router.PUT("/api/tutorials/code/attempt/:qnid/:language/:username", controllers.UpdateAttempt())
	// router.PUT("/api/tutorials/code/attempt/status/:qnid/:language/:username", controllers.UpdateStatus())
	// router.GET("/api/tutorials/code/attempt", controllers.GetAllAttempts())

}
