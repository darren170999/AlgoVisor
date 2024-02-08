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

type TestCaseController struct {
	testCaseService service.TestCaseService
}

func NewTestCaseController(service service.TestCaseService) *TestCaseController {
	return &TestCaseController{
		testCaseService: service,
	}
}

var testCaseCollection *mongo.Collection = configs.GetTestCasesCollection(configs.DB, "tutorial-test-cases")

// var validate = validator.New()

// CreateTags		godoc
// @Summary			By Admin only: Create TestCase
// @Description		Creating a TestCase
// @Param			TestCases body requests.CreateTestCasesRequest true "testCase"
// @Produce			application/json
// @TestCases		TestCases
// @Success			200 {object} responses.Response{}
// @Router			/testcase/create [post]
func CreateTestCases() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var testCases models.TestCases
		defer cancel()

		//validate the request body
		if err := c.BindJSON(&testCases); err != nil {
			c.JSON(http.StatusBadRequest, responses.TestCasesResponse{Status: http.StatusBadRequest, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		//use the validator library to validate required fields
		if validationErr := validate.Struct(&testCases); validationErr != nil {
			c.JSON(http.StatusBadRequest, responses.TestCasesResponse{Status: http.StatusBadRequest, Message: "error", Data: map[string]interface{}{"data": validationErr.Error()}})
			return
		}
		newTestCases := models.TestCases{
			Id:          primitive.NewObjectID(),
			QnId:        testCases.QnId,
			TestCases:   testCases.TestCases,
			HiddenTestCases: testCases.HiddenTestCases,
		}

		result, err := testCaseCollection.InsertOne(ctx, newTestCases)
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.TestCasesResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		c.JSON(http.StatusCreated, responses.TestCasesResponse{Status: http.StatusCreated, Message: "success", Data: map[string]interface{}{"data": result}})
	}
}

// CreateTags		godoc
// @Summary			Get all TestCases
// @Description		Get all current testCases in the Database.
// @Produce			application/json
// @Success			200 {object} responses.Response{}
// @Router			/testcase [get]
func GetAllTestCases() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var testCases []models.TestCases
		defer cancel()
		results, err := testCaseCollection.Find(ctx, bson.M{})

		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.TestCasesResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		defer results.Close(ctx)
		for results.Next(ctx) {
			var singleTestCase models.TestCases
			if err = results.Decode(&singleTestCase); err != nil {
				c.JSON(http.StatusInternalServerError, responses.TestCasesResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			}

			testCases = append(testCases, singleTestCase)
		}

		c.JSON(http.StatusOK,
			responses.TestCasesResponse{Status: http.StatusOK, Message: "success", Data: map[string]interface{}{"data": testCases}},
		)
	}
}

// DeleteTags		godoc
// @Summary			Delete TestCase based on qnid
// @Description		Delete TestCase from Db based on qnid.
// @Param			qnid path string true "qnid"
// @Produce			application/json
// @Success			200 {object} responses.Response{}
// @Router			/testcase/{qnid} [delete]
func DeleteATestCase() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		qnID := c.Param("qnid")
		defer cancel()

		// Create a filter to match the document with the given qnid
		filter := bson.M{"qnid": qnID}

		// Delete the document based on the filter
		result, err := testCaseCollection.DeleteOne(ctx, filter)
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.TestCasesResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		// Check if any document was deleted
		if result.DeletedCount == 0 {
			c.JSON(http.StatusNotFound,
				responses.TestCasesResponse{Status: http.StatusNotFound, Message: "error", Data: map[string]interface{}{"data": "Test case with specified qnid not found!"}},
			)
			return
		}

		c.JSON(http.StatusOK,
			responses.TestCasesResponse{Status: http.StatusOK, Message: "success", Data: map[string]interface{}{"data": "Test case successfully deleted!"}},
		)
	}
}

// CreateTags		godoc
// @Summary			Get testCase
// @Description		get a testCase from Db
// @Param qnid path string true "qnid"
// @Produce			application/json
// @Success			200 {object} responses.Response{}
// @Router			/testcase/{qnid} [get]
func GetATestCase() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		qnid := c.Param("qnid")
		filter := bson.M{"qnid": qnid}
		var testCases models.TestCases
		defer cancel()
		err := testCaseCollection.FindOne(ctx, filter).Decode(&testCases)
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.TestCasesResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}
		c.JSON(http.StatusOK, responses.TestCasesResponse{Status: http.StatusOK, Message: "success", Data: map[string]interface{}{"data": testCases}})
	}
}

// CreateTags		godoc
// @Summary			Edit testCase
// @Description		Edit testCases's data in Db.
// @Param 			TestCases body requests.EditTestCasesRequest true "testCases"
// @Produce			application/json
// @Success			200 {object} responses.Response{}
// @Router			/testcase/{qnid} [put]
// func EditATestCase() gin.HandlerFunc {
// 	return func(c *gin.Context) {
// 		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
// 		qnId := c.Param("QnId")
// 		var testCases models.TestCases
// 		defer cancel()
// 		objId, _ := primitive.ObjectIDFromHex(qnId)

// 		if err := c.BindJSON(&testCases); err != nil {
// 			c.JSON(http.StatusBadRequest, responses.TestCasesResponse{Status: http.StatusBadRequest, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
// 			return
// 		}

// 		if validationErr := validate.Struct(&testCases); validationErr != nil {
// 			c.JSON(http.StatusBadRequest, responses.TestCasesResponse{Status: http.StatusBadRequest, Message: "error", Data: map[string]interface{}{"data": validationErr.Error()}})
// 			return
// 		}

// 		update := bson.M{"testCases": testCases.TestCases}
// 		result, err := testCaseCollection.UpdateOne(ctx, bson.M{"id": objId}, bson.M{"$set": update})
// 		if err != nil {
// 			c.JSON(http.StatusInternalServerError, responses.TestCasesResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
// 			return
// 		}
// 		var updatedTestCases models.TestCases
// 		if result.MatchedCount == 1 {
// 			err := testCaseCollection.FindOne(ctx, bson.M{"id": objId}).Decode(&updatedTestCases)
// 			if err != nil {
// 				c.JSON(http.StatusInternalServerError, responses.TestCasesResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
// 				return
// 			}
// 		}

// 		c.JSON(http.StatusOK, responses.TestCasesResponse{Status: http.StatusOK, Message: "success", Data: map[string]interface{}{"data": updatedTestCases}})
// 	}
// }
