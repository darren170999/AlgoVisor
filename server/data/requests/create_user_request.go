package requests

type CreateUsersRequest struct {
	Name     string `validate:"required,min=1,max=200" json:"name"`
	Location string `json:"location,omitempty" validate:"required"`
	Title    string `json:"title,omitempty" validate:"required"`
}
