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
	// "golang.org/x/crypto/bcrypt"
)

type TutorialController struct {
	tutorialService service.TutorialService
}

func NewTutorialController(service service.TutorialService) *TutorialController {
	return &TutorialController{
		tutorialService: service,
	}
}

var tutorialCollection *mongo.Collection = configs.GetTutorialCollection(configs.DB, "tutorial-questions")

// var validate = validator.New()

// CreateTags		godoc
// @Summary			By Admin only: Create Tutorial Question
// @Description		Creating a Question
// @Param			Question body requests.CreateQuestionRequest true "question"
// @Produce			application/json
// @Tutorial		tutorial
// @Success			200 {object} responses.Response{}
// @Router			/tutorials/code/create [post]
func CreateQuestion() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var tutorial models.Tutorial
		defer cancel()

		//validate the request body
		if err := c.BindJSON(&tutorial); err != nil {
			c.JSON(http.StatusBadRequest, responses.TutorialResponse{Status: http.StatusBadRequest, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		//use the validator library to validate required fields
		if validationErr := validate.Struct(&tutorial); validationErr != nil {
			c.JSON(http.StatusBadRequest, responses.TutorialResponse{Status: http.StatusBadRequest, Message: "error", Data: map[string]interface{}{"data": validationErr.Error()}})
			return
		}
		newTutorial := models.Tutorial{
			Id:          primitive.NewObjectID(),
			QnId:        tutorial.QnId,
			Name:        tutorial.Name,
			Description: tutorial.Description,
			Status:      tutorial.Status,
			Tags:        tutorial.Tags,
		}

		result, err := tutorialCollection.InsertOne(ctx, newTutorial)
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.TutorialResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		c.JSON(http.StatusCreated, responses.TutorialResponse{Status: http.StatusCreated, Message: "success", Data: map[string]interface{}{"data": result}})
	}
}

// CreateTags		godoc
// @Summary			Get all Tutorial Questions
// @Description		Get all current questions in the Database.
// @Produce			application/json
// @Success			200 {object} responses.Response{}
// @Router			/tutorials [get]
func GetAllQn() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var tutorial []models.Tutorial
		defer cancel()
		results, err := tutorialCollection.Find(ctx, bson.M{})

		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.TutorialResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		defer results.Close(ctx)
		for results.Next(ctx) {
			var singleTutorial models.Tutorial
			if err = results.Decode(&singleTutorial); err != nil {
				c.JSON(http.StatusInternalServerError, responses.TutorialResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			}

			tutorial = append(tutorial, singleTutorial)
		}

		c.JSON(http.StatusOK,
			responses.TutorialResponse{Status: http.StatusOK, Message: "success", Data: map[string]interface{}{"data": tutorial}},
		)
	}
}

// CreateTags		godoc
// @Summary			Delete Question, Only Admin can delete
// @Description		Delete Question from Db.
// @Param			Tutorial body requests.DeleteQuestionRequest true "qnId"
// @Produce			application/json
// @Success			200 {object} responses.Response{}
// @Router			/tutorials/code/{qnId} [delete]
func DeleteAQuestion() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		qnId := c.Param("qnId")
		defer cancel()

		objId, _ := primitive.ObjectIDFromHex(qnId)

		result, err := tutorialCollection.DeleteOne(ctx, bson.M{"id": objId})
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.TutorialResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		if result.DeletedCount < 1 {
			c.JSON(http.StatusNotFound,
				responses.TutorialResponse{Status: http.StatusNotFound, Message: "error", Data: map[string]interface{}{"data": "User with specified ID not found!"}},
			)
			return
		}

		c.JSON(http.StatusOK,
			responses.TutorialResponse{Status: http.StatusOK, Message: "success", Data: map[string]interface{}{"data": "User successfully deleted!"}},
		)
	}
}

// CreateTags		godoc
// @Summary			Get Question
// @Description		get a question from Db
// @Param			Tutorial body requests.GetQuestionRequest true "qnId, name"
// @Produce			application/json
// @Success			200 {object} responses.Response{}
// @Router			/tutorials/code/{qnId} [get]
func GetAQuestion() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var tutorial models.Tutorial
		defer cancel()
		err := tutorialCollection.FindOne(ctx, tutorial.QnId).Decode(&tutorial)
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.TutorialResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		c.JSON(http.StatusOK, responses.TutorialResponse{Status: http.StatusOK, Message: "success", Data: map[string]interface{}{"data": tutorial}})
	}
}

// CreateTags		godoc
// @Summary			Edit Question
// @Description		Edit question's data in Db.
// @Param 			Question body requests.EditAQuestionRequest true "tutorial"
// @Produce			application/json
// @Success			200 {object} responses.Response{}
// @Router			/tutorials/code/{qnId} [put]
func EditAQuestion() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		qnId := c.Param("QnId")
		var tutorial models.Tutorial
		defer cancel()
		objId, _ := primitive.ObjectIDFromHex(qnId)

		if err := c.BindJSON(&tutorial); err != nil {
			c.JSON(http.StatusBadRequest, responses.TutorialResponse{Status: http.StatusBadRequest, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		if validationErr := validate.Struct(&tutorial); validationErr != nil {
			c.JSON(http.StatusBadRequest, responses.TutorialResponse{Status: http.StatusBadRequest, Message: "error", Data: map[string]interface{}{"data": validationErr.Error()}})
			return
		}

		update := bson.M{"name": tutorial.Name, "description": tutorial.Description, "status": tutorial.Status, "tags": tutorial.Tags}
		result, err := tutorialCollection.UpdateOne(ctx, bson.M{"id": objId}, bson.M{"$set": update})
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.TutorialResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}
		var updatedQuestion models.Tutorial
		if result.MatchedCount == 1 {
			err := tutorialCollection.FindOne(ctx, bson.M{"id": objId}).Decode(&updatedQuestion)
			if err != nil {
				c.JSON(http.StatusInternalServerError, responses.TutorialResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
				return
			}
		}

		c.JSON(http.StatusOK, responses.TutorialResponse{Status: http.StatusOK, Message: "success", Data: map[string]interface{}{"data": updatedQuestion}})
	}
}
