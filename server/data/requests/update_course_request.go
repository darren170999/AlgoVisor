package requests

type UpdateCoursesRequest struct {
	// Id        primitive.ObjectID `json:"id,omitempty"`
	Name                string `json:"name,omitempty" validate:"required"`
	Sypnopsis           string `json:"sypnopsis,omitempty" validate:"required"`
	Duration            string `json:"duration,omitempty" validate:"required"`
	Status              string `json:"status,omitempty" validate:"required"`
	// VideoSrc            []byte `json:"videoSrc,omitempty" validate:"required"`
	VideoDescription    string `json:"videoDescription,omitempty" validate:"required"`
	MaterialSrc         string `json:"materialSrc,omitempty" validate:"required"`
	MaterialDescription string `json:"materialDescription,omitempty" validate:"required"`
}
