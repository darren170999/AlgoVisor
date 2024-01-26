package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type TestCases struct {
	Id        primitive.ObjectID `json:"id,omitempty"`
	QnId      string             `json:"qnid,omitempty" validate:"required"`
	TestCases []SingleTestCase   `json:"testCases,omitempty"`
}

type SingleTestCase struct {
	// Define fields for each test case
	// For example:
	Input  string `json:"input,omitempty"`
	Output string `json:"output,omitempty"`
	// Add more fields as needed
}