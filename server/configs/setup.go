package configs

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func ConnectDB() *mongo.Client {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(EnvMongoURI()))
	if err != nil {
		log.Fatal(err)
	}
	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Connected to MongoDB")
	return client
}

// Client instance
var DB *mongo.Client = ConnectDB()

// getting database users
func GetUsersCollection(client *mongo.Client, collectionName string) *mongo.Collection {
	collection := client.Database("Dev-AlgoVisor").Collection(collectionName)
	return collection
}

// getting database courses
func GetCoursesCollection(client *mongo.Client, collectionName string) *mongo.Collection {
	collection := client.Database("Dev-Concepts").Collection(collectionName)
	return collection
}

// getting database tutorials
func GetTutorialCollection(client *mongo.Client, collectionName string) *mongo.Collection {
	collection := client.Database("Dev-Tutorial").Collection(collectionName)
	return collection
}

// getting database testCases
func GetTestCasesCollection(client *mongo.Client, collectionName string) *mongo.Collection {
	collection := client.Database("Dev-Tutorial").Collection(collectionName)
	return collection
}
// getting database attempts
func GetAttemptsCollection(client *mongo.Client, collectionName string) *mongo.Collection {
	collection := client.Database("Dev-Tutorial").Collection(collectionName)
	return collection
}