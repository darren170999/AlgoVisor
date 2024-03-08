package requests

type CreateSubscriberRequest struct {
	// Id        primitive.ObjectID `json:"id,omitempty"`
	Email    string `json:"email,omitempty" validate:"required"`
}
