package main
import (
	"os"
	"server/configs"
	// "server/routes"
	"github.com/gin-gonic/gin"
    // "github.com/gin-contrib/cors"
)
func main() {

	port := os.Getenv("PORT")

	if port == "" {
		port = "8000"
	}

	router := gin.Default()
	configs.ConnectDB()
	
	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
				"data": "Hello from Gin-gonic & mongoDB",
		})
	})

	router.Run("localhost:8080")
}