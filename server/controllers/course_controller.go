package controllers

import (
	"context"
	"io"

	// "io/ioutil" DEPRACATED

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
	"go.mongodb.org/mongo-driver/mongo/gridfs"
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
			Id:        primitive.NewObjectID(),
			Name:      course.Name,
			Sypnopsis: course.Sypnopsis,
			Duration:  course.Duration,
			Status:    course.Status,
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
// @Summary			By Admin only: Create Video
// @Description		Creating a Video
// @Param			Course formData file true "videoSrc"
// @Produce			application/json
// @Accept multipart/form-data
// @Course			courses
// @Success			200 {object} responses.Response{}
// @Router			/course/create/video [post]
func CreateVideo() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Parse the multipart form
		err := c.Request.ParseMultipartForm(10 << 20) // 10 MB max size
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to parse form"})
			return
		}

		// Retrieve the file from the form data
		file, header, err := c.Request.FormFile("videoSrc")
		// fmt.Print(header);
		if (err != nil || header == nil) {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to retrieve video file"})
			return
		}
		defer file.Close()

		// Get the desired filename from the request
		desiredFilename := c.PostForm("filename")
		if desiredFilename == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Filename is required"})
			return
		}

		// Connect to the GridFS bucket
		bucket, err := gridfs.NewBucket(courseCollection.Database())
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create GridFS bucket"})
			return
		}

		// Open an upload stream with the desired filename
		uploadStream, err := bucket.OpenUploadStreamWithID(desiredFilename, desiredFilename)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to open upload stream"})
			return
		}
		defer uploadStream.Close()

		// Copy the file data to the upload stream
		_, err = io.Copy(uploadStream, file)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to upload file"})
			return
		}

		// Return a success response
		c.JSON(http.StatusCreated, gin.H{"message": "Video uploaded successfully"})
	}
}

func GetVideo() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Get the file name filter from the query parameters
		fileName := c.Param("filename")
		if fileName == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "File name filter is required"})
			return
		}

		// Connect to the GridFS bucket
		bucket, err := gridfs.NewBucket(courseCollection.Database())
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create GridFS bucket"})
			return
		}

		// Open a download stream for the file matching the file name filter
		downloadStream, err := bucket.OpenDownloadStreamByName(fileName)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to open download stream"})
			return
		}
		defer downloadStream.Close()

		// Set the Content-Type header based on the file type
		c.Writer.Header().Set("Content-Type", "video/mp4")

		// Copy the video data from the download stream to the response writer
		_, err = io.Copy(c.Writer, downloadStream)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to copy video data to response"})
			return
		}
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
