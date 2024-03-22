package routes

import (
	"server/controllers"

	"github.com/gin-gonic/gin"
)

func SettingsRoute(router *gin.Engine) {

	router.GET("/settings", controllers.GetAllSettings())
	router.GET("/api/settings", controllers.GetAllSettings())
}