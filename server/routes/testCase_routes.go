package routes

import (
	"server/controllers"

	"github.com/gin-gonic/gin"
)

func TestCasesRoute(router *gin.Engine) {
	// Main Endpoints
	router.POST("/testcase/create", controllers.CreateTestCases())
	router.GET("/testcase/:qnid", controllers.GetATestCase())
	// router.PUT("/testcase/:qnid", controllers.EditATestCase())
	router.DELETE("/testcase/:qnid", controllers.DeleteATestCase())
	router.GET("/testcase", controllers.GetAllTestCases())
	// Swagger API testing
	// router.POST("/api/testcase/create", controllers.CreateTestCases())
	// router.GET("/api/testcase/:qnid", controllers.GetATestCase())
	// router.PUT("/api/testcase/:qnid", controllers.EditATestCase())
	// router.DELETE("/api/testcase/:qnid", controllers.DeleteATestCase())
	// router.GET("/api/testcase", controllers.GetAllTestCases())
}
