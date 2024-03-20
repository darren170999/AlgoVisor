package controllers

import (
	"context"
	"net/http"
	"server/configs"
	"server/data/responses"
	"server/models"
	"server/service"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type SettingsController struct {
	SettingsService service.SettingsService
}

func NewSettingsController(service service.CoursesService) *CoursesController {
	return &CoursesController{
		coursesService: service,
	}
}

var settingsCollection *mongo.Collection = configs.GetSettingsCollection(configs.DB, "settings")


// CreateTags		godoc
// @Summary			Get all API Keys
// @Description		Get all api keys
// @Produce			application/json
// @Success			200 {object} responses.Response{}
// @Router			/settings [get]
func GetAllSettings() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var settings []models.Settings
		defer cancel()
		results, err := settingsCollection.Find(ctx, bson.M{})

		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.CourseResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		//reading from the db in an optimal way
		defer results.Close(ctx)
		for results.Next(ctx) {
			var singleSettings models.Settings
			if err = results.Decode(&singleSettings); err != nil {
				c.JSON(http.StatusInternalServerError, responses.CourseResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			}

			settings = append(settings, singleSettings)
		}

		c.JSON(http.StatusOK,
			responses.CourseResponse{Status: http.StatusOK, Message: "success", Data: map[string]interface{}{"data": settings}},
		)
	}
}
