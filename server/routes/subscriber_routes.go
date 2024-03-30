package routes

import (
	"server/controllers"

	"github.com/gin-gonic/gin"
)

func SubscriberRoute(router *gin.Engine) {
	//All routes related to users comes here
	router.POST("/subscriber", controllers.CreateSubscriber())
	router.DELETE("/subscriber", controllers.DeleteSubscriber())
	router.GET("/subscribers", controllers.GetAllSubscriber())
	router.GET("/subscribers/notify", controllers.GetAndNotify())
	// Swagger API testing
	// router.POST("/api/subscriber", controllers.CreateSubscriber())
	// router.DELETE("/api/subscriber", controllers.DeleteSubscriber())
	// router.GET("/api/subscribers", controllers.GetAllSubscriber())
	// router.GET("/api/subscribers/notify", controllers.GetAndNotify())

}
