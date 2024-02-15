package models

type Video struct {
	VideoSrc            []byte             `json:"videoSrc,omitempty" validate:"required"`
}
