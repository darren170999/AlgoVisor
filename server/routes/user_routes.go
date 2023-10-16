package routes

import (
	"server/controllers"

	"github.com/gin-gonic/gin"
)

func UserRoute(router *gin.Engine) {
	//All routes related to users comes here
	router.POST("/user", controllers.CreateUser())
	router.POST("/user/login", controllers.UserLogin())
	router.GET("/user/:userId", controllers.GetAUser())
	router.PUT("/user/:userId", controllers.EditAUser())
	router.DELETE("/user/:userId", controllers.DeleteAUser())
	router.GET("/users", controllers.GetAllUsers())
	// Swagger API testing
	router.POST("/api/user", controllers.CreateUser())
	router.POST("/api/user/login", controllers.UserLogin())
	router.GET("/api/user/:userId", controllers.GetAUser())
	router.PUT("/api/user/:userId", controllers.EditAUser())
	router.DELETE("/api/user/:userId", controllers.DeleteAUser())
	router.GET("/api/users", controllers.GetAllUsers())
	
}
