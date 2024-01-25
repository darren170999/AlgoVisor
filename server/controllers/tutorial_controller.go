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
			Examples:    tutorial.Examples,
			Constraints: tutorial.Constraints,
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

// DeleteTags		godoc
// @Summary			Delete Question based on qnid
// @Description		Delete Question from Db based on qnid.
// @Param			qnid path string true "qnid"
// @Produce			application/json
// @Success			200 {object} responses.Response{}
// @Router			/tutorials/code/{qnid} [delete]
func DeleteAQuestion() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		qnID := c.Param("qnid")
		defer cancel()
		filter := bson.M{"qnid": qnID}
		result, err := tutorialCollection.DeleteOne(ctx, filter)
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.TutorialResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}
		if result.DeletedCount == 0 {
			c.JSON(http.StatusNotFound,
				responses.TutorialResponse{Status: http.StatusNotFound, Message: "error", Data: map[string]interface{}{"data": "Question with specified qnid not found!"}},
			)
			return
		}

		c.JSON(http.StatusOK,
			responses.TutorialResponse{Status: http.StatusOK, Message: "success", Data: map[string]interface{}{"data": "Question successfully deleted!"}},
		)
	}
}

// CreateTags		godoc
// @Summary			Get Question
// @Description		get a question from Db
// @Param qnid path string true "qnid"
// @Produce			application/json
// @Success			200 {object} responses.Response{}
// @Router			/tutorials/code/{qnid} [get]
func GetAQuestion() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		qnid := c.Param("qnid")
		filter := bson.M{"qnid": qnid}
		var tutorial models.Tutorial
		defer cancel()
		err := tutorialCollection.FindOne(ctx, filter).Decode(&tutorial)
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
// @Router			/tutorials/code/{qnid} [put]
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

		update := bson.M{"name": tutorial.Name, "description": tutorial.Description, "examples": tutorial.Examples, 
		"constraints": tutorial.Constraints, "status": tutorial.Status, "tags": tutorial.Tags}
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
