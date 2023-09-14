package main

import (
    "server/configs" //add this
	"server/routes"
    "github.com/gin-gonic/gin"
)

func main() {
    router := gin.Default()

    //run database
    configs.ConnectDB()

	routes.UserRoute(router)

    router.Run("localhost:8080")
}