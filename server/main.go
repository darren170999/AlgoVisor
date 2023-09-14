package main

import (
	"server/configs" //add this
	_ "server/docs"
	"server/routes"

	// "server/controllers"

	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @title 	Tag Service API
// @version	1.0
// @description A Tag service API in Go using Gin framework

// @host 	localhost:8080
// @BasePath /api
func main() {
	router := gin.Default()
	//run database
	configs.ConnectDB()
	//add swagger
	router.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	//Router
	routes.UserRoute(router)

	router.Run("localhost:8080")
}
