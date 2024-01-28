package requests

type UpdateAttemptRequest struct {
	// Id       primitive.ObjectID `json:"id,omitempty"`
	QnId     string `json:"qnid,omitempty" validate:"required"`
	Username string `json:"username,omitempty" validate:"required"`
	Attempt  string `json:"attempt,omitempty" validate:"required"`
	Language string `json:"language,omitempty" validate:"required"`
	Status   string `json:"status,omitempty" validate:"required"`
}
