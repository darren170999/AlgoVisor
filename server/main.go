package main

import (
	"server/configs"
	_ "server/docs"
	"server/routes"

	// "server/controllers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @title 	Service API
// @version	1.0
// @description Service API in Go using Gin framework
// @host 	localhost:8080
// @BasePath /api
func main() {
        // Set Gin mode to release mode
        gin.SetMode(gin.ReleaseMode)
	router := gin.Default()

	// Initialize the database
	configs.ConnectDB()

	// CORS configuration
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"https://algo-visor.vercel.app/"} // Opening a port hole for everything in this ""
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE"}
        config.AllowHeaders = []string{"Origin", "Content-Type"}
	router.Use(cors.New(config))

	// Add Swagger documentation
	router.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	// Define your routes
	routes.UserRoute(router)
	routes.CourseRoute(router)
	routes.TutorialRoute(router)
	routes.TestCasesRoute(router)
	routes.AttemptRoute(router)
	routes.SubscriberRoute(router)
	routes.SettingsRoute(router)

	router.Run(":8080")
}
