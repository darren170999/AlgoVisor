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
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type StaticCoursesController struct {
	staticCoursesService service.StaticCourseService
}

func NewStaticCoursesController(service service.StaticCourseService) *StaticCoursesController {
	return &StaticCoursesController{
		staticCoursesService: service,
	}
}

var staticCourseCollection *mongo.Collection = configs.GetCoursesCollection(configs.DB, "staticCourse")

func CreateStaticCourse() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		var course models.StaticCourse
		if err := c.ShouldBindJSON(&course); err != nil {
			c.JSON(http.StatusBadRequest, responses.CourseResponse{Status: http.StatusBadRequest, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		if validationErr := validate.Struct(&course); validationErr != nil {
			c.JSON(http.StatusBadRequest, responses.CourseResponse{Status: http.StatusBadRequest, Message: "error", Data: map[string]interface{}{"data": validationErr.Error()}})
			return
		}

		newCourse := models.StaticCourse{
			Id:                  primitive.NewObjectID(),
			Name:                course.Name,
			Sypnopsis:           course.Sypnopsis,
			Duration:            course.Duration,
			Status:              course.Status,
			VideoSrc:            course.VideoSrc,
			VideoDescription:    course.VideoDescription,
			MaterialSrc:         course.MaterialSrc,
			MaterialDescription: course.MaterialDescription,
		}

		result, err := staticCourseCollection.InsertOne(ctx, newCourse)
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.CourseResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		c.JSON(http.StatusCreated, responses.CourseResponse{Status: http.StatusCreated, Message: "success", Data: map[string]interface{}{"data": result}})
	}
}
func GetAllStaticCourses() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var courses []models.StaticCourse
		defer cancel()
		results, err := staticCourseCollection.Find(ctx, bson.M{})

		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.CourseResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		defer results.Close(ctx)
		for results.Next(ctx) {
			var singleCourse models.StaticCourse
			if err = results.Decode(&singleCourse); err != nil {
				c.JSON(http.StatusInternalServerError, responses.CourseResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			}

			courses = append(courses, singleCourse)
		}

		c.JSON(http.StatusOK,
			responses.CourseResponse{Status: http.StatusOK, Message: "success", Data: map[string]interface{}{"data": courses}},
		)
	}
}

func DeleteAStaticCourse() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		name := c.Param("name")
		defer cancel()
		filter := bson.M{"name": name}
		result, err := courseCollection.DeleteOne(ctx, filter)
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.CourseResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}
		if result.DeletedCount == 0 {
			c.JSON(http.StatusNotFound,
				responses.CourseResponse{Status: http.StatusNotFound, Message: "error", Data: map[string]interface{}{"data": "ERR"}},
			)
			return
		}
		c.JSON(http.StatusOK,
			responses.CourseResponse{Status: http.StatusOK, Message: "success", Data: map[string]interface{}{"data": "ERR"}},
		)
	}
}
