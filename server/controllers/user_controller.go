package controllers

import (
	"context"
	"log"
	"net/http"
	"net/smtp"
	"server/configs"
	"server/data/requests"
	"server/data/responses"
	"server/models"
	"server/service"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

type UsersController struct {
	usersService service.UsersService
}

func NewUsersController(service service.UsersService) *UsersController {
	return &UsersController{
		usersService: service,
	}
}

var userCollection *mongo.Collection = configs.GetUsersCollection(configs.DB, "users")
var validate = validator.New()

// CreateTags		godoc
// @Summary			Create User/ Sign Up for account
// @Description		Creating a User Data in MongoDB. UserName as Key
// @Param			User body requests.CreateUsersRequest true "user"
// @Produce			application/json
// @User			users
// @Success			200 {object} responses.Response{}
// @Router			/user [post]
func CreateUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var user models.User
		defer cancel()

		//validate the request body
		if err := c.BindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, responses.UserResponse{Status: http.StatusBadRequest, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		//use the validator library to validate required fields
		if validationErr := validate.Struct(&user); validationErr != nil {
			c.JSON(http.StatusBadRequest, responses.UserResponse{Status: http.StatusBadRequest, Message: "error", Data: map[string]interface{}{"data": validationErr.Error()}})
			return
		}

		existingUser := models.User{}
		err := userCollection.FindOne(ctx, bson.M{"username": user.UserName}).Decode(&existingUser)
		if err == nil {
			c.JSON(http.StatusConflict, responses.UserResponse{Status: http.StatusConflict, Message: "error", Data: map[string]interface{}{"data": "Username already taken"}})
			return
		} else if err != mongo.ErrNoDocuments {
			c.JSON(http.StatusInternalServerError, responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		err = userCollection.FindOne(ctx, bson.M{"email": user.Email}).Decode((&existingUser))
		if err == nil {
			c.JSON(http.StatusConflict, responses.UserResponse{Status: http.StatusConflict, Message: "error", Data: map[string]interface{}{"data": "Email already taken"}})
			return
		} else if err != mongo.ErrNoDocuments {
			c.JSON(http.StatusInternalServerError, responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		// createUsersRequest := request.CreateUsersRequest{}
		// // err := ctx.ShouldBindJSON(&createUsersRequest)
		// // controller.usersService.Create(createUsersRequest)
		newUser := models.User{
			Id:       primitive.NewObjectID(),
			Name:     user.Name,
			Email:    user.Email,
			Title:    user.Title,
			UserName: user.UserName,
			Password: string(hashedPassword),
		}

		result, err := userCollection.InsertOne(ctx, newUser)
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		// Send welcome email
		if err := sendWelcomeEmail(user.Email, user.Name); err != nil {
			// Log or handle error, but don't interrupt user flow
			log.Println("Failed to send welcome email:", err)
		}

		c.JSON(http.StatusCreated, responses.UserResponse{Status: http.StatusCreated, Message: "success", Data: map[string]interface{}{"data": result}})
	}
}

func sendWelcomeEmail(receiverEmail, receiverName string) error {
	senderEmail := "darrensohjunhan@gmail.com"
	senderPassword := "xdom urig tgqm zyao"

	auth := smtp.PlainAuth("", senderEmail, senderPassword, "smtp.gmail.com")

	to := []string{receiverEmail}
	msg := []byte("To: " + receiverEmail + "\r\n" +
		"Subject: Welcome to AlgoVisor\r\n" +
		"\r\n" +
		"Dear " + receiverName + ",\r\n" +
		"\r\n" +
		"We sincerely appreciate that you took time for this!\r\n" +
		"\r\n" +
		"Thank you for signing up, we have verified your account.\r\n" +
		"\r\n" +
		"Happy learning,\r\n" +
		"AlgoVisor")

	err := smtp.SendMail("smtp.gmail.com:587", auth, senderEmail, to, msg)
	if err != nil {
		return err
	}
	return nil
}

// CreateTags		godoc
// @Summary			Get User / login
// @Description		get a user data from Db. Checks both username and Password
// @Param			User body requests.GetUserRequest true "username, password"
// @Produce			application/json
// @Success			200 {object} responses.Response{}
// @Router			/user/{userName} [get]
func GetAUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		// matricNum := c.Param("matricNum")
		var user models.User
		defer cancel()

		// objId, _ := primitive.ObjectIDFromHex(userId)
		// matricNum :=
		err := userCollection.FindOne(ctx, user.UserName).Decode(&user)
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		c.JSON(http.StatusOK, responses.UserResponse{Status: http.StatusOK, Message: "success", Data: map[string]interface{}{"data": user}})
	}
}

// @Summary     User Login
// @Description   Authenticate a user by username and password
// @Param       User body requests.LoginRequest true "username, password"
// @Produce     application/json
// @Success     200 {object} responses.UserResponse{}
// @Router      /user/login [post]
func UserLogin() gin.HandlerFunc {
	return func(c *gin.Context) {
		var loginReq requests.LoginRequest
		if err := c.ShouldBindJSON(&loginReq); err != nil {
			c.JSON(http.StatusBadRequest, responses.UserResponse{Status: http.StatusBadRequest, Message: "Bad Request", Data: nil})
			return
		}

		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		var user models.User
		err := userCollection.FindOne(ctx, bson.M{"username": loginReq.UserName}).Decode(&user)
		if err != nil {
			log.Println("User not found:", err)
			c.JSON(http.StatusUnauthorized, responses.UserResponse{Status: http.StatusUnauthorized, Message: "Invalid credentials", Data: nil})
			return
		}

		// Compare the hashed password
		err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(loginReq.Password))
		if err != nil {
			log.Println("Password comparison failed:", err)
			c.JSON(http.StatusUnauthorized, responses.UserResponse{Status: http.StatusUnauthorized, Message: "Invalid credentials", Data: nil})
			return
		}

		// Successful login
		c.JSON(http.StatusOK, responses.UserResponse{Status: http.StatusOK, Message: "Login successful", Data: map[string]interface{}{"data": user}})
	}
}

// CreateTags		godoc
// @Summary			Edit User
// @Description		Edit user's data in Db.
// @Param 			User body requests.EditUserRequest true "user"
// @Produce			application/json
// @Success			200 {object} responses.Response{}
// @Router			/user/{userId} [put]
func EditAUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		userId := c.Param("userId")
		var user models.User
		defer cancel()
		objId, _ := primitive.ObjectIDFromHex(userId)

		//validate the request body
		if err := c.BindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, responses.UserResponse{Status: http.StatusBadRequest, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		//use the validator library to validate required fields
		if validationErr := validate.Struct(&user); validationErr != nil {
			c.JSON(http.StatusBadRequest, responses.UserResponse{Status: http.StatusBadRequest, Message: "error", Data: map[string]interface{}{"data": validationErr.Error()}})
			return
		}

		update := bson.M{"name": user.Name, "email": user.Email, "title": user.Title}
		result, err := userCollection.UpdateOne(ctx, bson.M{"id": objId}, bson.M{"$set": update})
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		//get updated user details
		var updatedUser models.User
		if result.MatchedCount == 1 {
			err := userCollection.FindOne(ctx, bson.M{"id": objId}).Decode(&updatedUser)
			if err != nil {
				c.JSON(http.StatusInternalServerError, responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
				return
			}
		}

		c.JSON(http.StatusOK, responses.UserResponse{Status: http.StatusOK, Message: "success", Data: map[string]interface{}{"data": updatedUser}})
	}
}

// CreateTags		godoc
// @Summary			Delete User
// @Description		Delete User from Db.
// @Param			User body requests.GetUserRequest true "userId"
// @Produce			application/json
// @Success			200 {object} responses.Response{}
// @Router			/user/{userId} [delete]
func DeleteAUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		userId := c.Param("userId")
		defer cancel()

		objId, _ := primitive.ObjectIDFromHex(userId)

		result, err := userCollection.DeleteOne(ctx, bson.M{"id": objId})
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		if result.DeletedCount < 1 {
			c.JSON(http.StatusNotFound,
				responses.UserResponse{Status: http.StatusNotFound, Message: "error", Data: map[string]interface{}{"data": "User with specified ID not found!"}},
			)
			return
		}

		c.JSON(http.StatusOK,
			responses.UserResponse{Status: http.StatusOK, Message: "success", Data: map[string]interface{}{"data": "User successfully deleted!"}},
		)
	}
}

// CreateTags		godoc
// @Summary			Get all Users
// @Description		Get all current users in my Database.
// @Produce			application/json
// @Success			200 {object} responses.Response{}
// @Router			/users [get]
func GetAllUsers() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var users []models.User
		defer cancel()

		results, err := userCollection.Find(ctx, bson.M{})

		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		//reading from the db in an optimal way
		defer results.Close(ctx)
		for results.Next(ctx) {
			var singleUser models.User
			if err = results.Decode(&singleUser); err != nil {
				c.JSON(http.StatusInternalServerError, responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			}

			users = append(users, singleUser)
		}

		c.JSON(http.StatusOK,
			responses.UserResponse{Status: http.StatusOK, Message: "success", Data: map[string]interface{}{"data": users}},
		)
	}
}
