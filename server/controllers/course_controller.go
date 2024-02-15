package controllers

import (
	"context"
	// "fmt"
	// "io"

	// "io/ioutil"

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
	// "golang.org/x/crypto/bcrypt"
)

type CoursesController struct {
	coursesService service.CoursesService
}

func NewCoursesController(service service.CoursesService) *CoursesController {
	return &CoursesController{
		coursesService: service,
	}
}

var courseCollection *mongo.Collection = configs.GetCoursesCollection(configs.DB, "course")

// var validate = validator.New()

// CreateTags		godoc
// @Summary			By Admin only: Create Course
// @Description		Creating a Course
// @Param           Course body requests.CreateCoursesRequest true "course JSON data"
// @Produce			application/json
// @Course			courses
// @Success			200 {object} responses.Response{}
// @Router			/course/create [post]
func CreateCourse() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		// Read the blob data from the request body
		// videoData, err := io.ReadAll(c.Request.Body)
		// if err != nil {
		// 	c.JSON(http.StatusInternalServerError, responses.CourseResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
		// 	return
		// }
		// defer c.Request.Body.Close()

		// Retrieve other fields from the JSON request body
		var course models.Course
		if err := c.ShouldBindJSON(&course); err != nil {
			c.JSON(http.StatusBadRequest, responses.CourseResponse{Status: http.StatusBadRequest, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		// Validate the course fields using a validator library (assuming validate is the validator instance)
		if validationErr := validate.Struct(&course); validationErr != nil {
			c.JSON(http.StatusBadRequest, responses.CourseResponse{Status: http.StatusBadRequest, Message: "error", Data: map[string]interface{}{"data": validationErr.Error()}})
			return
		}

		// Construct the new course object with blob data and other fields
		newCourse := models.Course{
			Id:                  primitive.NewObjectID(),
			Name:                course.Name,
			Sypnopsis:           course.Sypnopsis,
			Duration:            course.Duration,
			Status:              course.Status,
			// VideoSrc:            videoData, // Assign blob data to VideoSrc field
			VideoDescription:    course.VideoDescription,
			MaterialSrc:         course.MaterialSrc,
			MaterialDescription: course.MaterialDescription,
		}

		// Insert the new course into the database
		result, err := courseCollection.InsertOne(ctx, newCourse)
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.CourseResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		// Return a success response
		c.JSON(http.StatusCreated, responses.CourseResponse{Status: http.StatusCreated, Message: "success", Data: map[string]interface{}{"data": result}})
	}
}


// CreateTags		godoc
// @Summary			Get all Courses
// @Description		Get all current courses in the Database.
// @Produce			application/json
// @Success			200 {object} responses.Response{}
// @Router			/courses [get]
func GetAllCourses() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var courses []models.Course
		defer cancel()
		results, err := courseCollection.Find(ctx, bson.M{})

		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.CourseResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		//reading from the db in an optimal way
		defer results.Close(ctx)
		for results.Next(ctx) {
			var singleCourse models.Course
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
