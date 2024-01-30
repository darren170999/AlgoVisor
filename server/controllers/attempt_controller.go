package controllers

import (
	"context"
	"net/http"
	"server/configs"
	"server/data/responses"
	"server/models"
	"server/service"
	"time"

	// "fmt"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	// "golang.org/x/crypto/bcrypt"
)

type AttemptController struct {
	attemptService service.AttemptService
}

func NewAttemptController(service service.AttemptService) *AttemptController {
	return &AttemptController{
		attemptService: service,
	}
}

var attemptCollection *mongo.Collection = configs.GetAttemptsCollection(configs.DB, "tutorial-attempts")

// var validate = validator.New()

// CreateTags		godoc
// @Summary			Save Attempt
// @Description		Creating Attempt
// @Param			Attempt body requests.CreateAttemptRequest true "attempt"
// @Produce			application/json
// @Attempt		attempt
// @Success			200 {object} responses.Response{}
// @Router			/tutorials/code/attempt/create [post]
func CreateAttempt() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var attempt models.Attempt
		defer cancel()

		// validate the request body
		if err := c.BindJSON(&attempt); err != nil {
			c.JSON(http.StatusBadRequest, responses.AttemptResponse{Status: http.StatusBadRequest, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		// use the validator library to validate required fields
		if validationErr := validate.Struct(&attempt); validationErr != nil {
			c.JSON(http.StatusBadRequest, responses.AttemptResponse{Status: http.StatusBadRequest, Message: "error", Data: map[string]interface{}{"data": validationErr.Error()}})
			return
		}

		newAttempt := models.Attempt{
			Id:       primitive.NewObjectID(),
			QnId:     attempt.QnId,
			Username: attempt.Username,
			Status:   attempt.Status,
			Attempt:  attempt.Attempt,
			Language: attempt.Language,
		}

		result, err := attemptCollection.InsertOne(ctx, newAttempt)
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.AttemptResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		c.JSON(http.StatusCreated, responses.AttemptResponse{Status: http.StatusCreated, Message: "success", Data: map[string]interface{}{"data": result}})
	}
}

// CreateTags		godoc
// @Summary			Get all Attempts
// @Description		Get all current attempts in the Database.
// @Produce			application/json
// @Success			200 {object} responses.Response{}
// @Router			/tutorials/code/attempt [get]
func GetAllAttempts() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var attempt []models.Attempt
		defer cancel()
		results, err := attemptCollection.Find(ctx, bson.M{})

		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.AttemptResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		defer results.Close(ctx)
		for results.Next(ctx) {
			var singleAttempt models.Attempt
			if err = results.Decode(&singleAttempt); err != nil {
				c.JSON(http.StatusInternalServerError, responses.AttemptResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			}

			attempt = append(attempt, singleAttempt)
		}

		c.JSON(http.StatusOK,
			responses.AttemptResponse{Status: http.StatusOK, Message: "success", Data: map[string]interface{}{"data": attempt}},
		)
	}
}

// CreateTags		godoc
// @Summary			Get Attempt
// @Description		get Attempt from Db filtered by username and qnid
// @Param qnid path string true "qnid"
// @Param username path string true "username"
// @Produce			application/json
// @Success			200 {object} responses.Response{}
// @Router			/tutorials/code/attempt/{qnid}/{username} [get]
func GetAttemptByQnIdByUsername() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		qnid := c.Param("qnid")
		username := c.Param("username")
		filter := bson.M{"qnid": qnid, "username": username}
		var attempt models.Attempt
		defer cancel()
		err := attemptCollection.FindOne(ctx, filter).Decode(&attempt)
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.AttemptResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}
		c.JSON(http.StatusOK, responses.AttemptResponse{Status: http.StatusOK, Message: "success", Data: map[string]interface{}{"data": attempt}})
	}
}

// CreateTags		godoc
// @Summary			Edit Attempt
// @Description		Edit attempt's data in Db.
// @Param 			Attempt body requests.UpdateAttemptRequest true "attempt"
// @Produce			application/json
// @Success			200 {object} responses.Response{}
// @Router			/tutorials/code/attempt/{qnid} [put]
func UpdateAttempt() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var attempt models.Attempt
		// qnId := attempt.QnId
		// username := attempt.Username
		defer cancel()

		if err := c.BindJSON(&attempt); err != nil {
			c.JSON(http.StatusBadRequest, responses.AttemptResponse{Status: http.StatusBadRequest, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		if validationErr := validate.Struct(&attempt); validationErr != nil {
			c.JSON(http.StatusBadRequest, responses.AttemptResponse{Status: http.StatusBadRequest, Message: "error", Data: map[string]interface{}{"data": validationErr.Error()}})
			return
		}
		filter := bson.M{"qnid": attempt.QnId, "username": attempt.Username}
		update := bson.M{"$set": bson.M{"attempt": attempt.Attempt, "status": attempt.Status}}

		result, err := attemptCollection.UpdateOne(ctx, filter, update)
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.AttemptResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}
		// fmt.Print(filter)
		// fmt.Print(update)
		var updatedAttempt models.Attempt
		// fmt.Printf("MatchedCount: %d, ModifiedCount: %d\n", result.MatchedCount, result.ModifiedCount)
		// fmt.Print(result)
		if result.MatchedCount == 1 {
			err := attemptCollection.FindOne(ctx, filter).Decode(&updatedAttempt)
			if err != nil {
				c.JSON(http.StatusInternalServerError, responses.AttemptResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
				return
			}
		}

		c.JSON(http.StatusOK, responses.AttemptResponse{Status: http.StatusOK, Message: "success", Data: map[string]interface{}{"data": updatedAttempt}})
	}
}
