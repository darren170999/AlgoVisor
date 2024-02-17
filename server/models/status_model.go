package models

type Status_Attempt struct {
	// Id       primitive.ObjectID `json:"id,omitempty"`
	// QnId     string             `json:"qnid,omitempty" validate:"required"`
	// Username string             `json:"username,omitempty" validate:"required"`
	Attempt string `json:"attempt,omitempty" validate:"required"`
	// Language int                `json:"language,omitempty" validate:"required"`
	Status string `json:"status,omitempty" validate:"required"`
}
