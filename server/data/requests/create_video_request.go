package requests

type CreateVideoRequest struct {
	VideoSrc            []byte `json:"videoSrc,omitempty" validate:"required"`
}
