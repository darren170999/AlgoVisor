package requests

// import "go.mongodb.org/mongo-driver/bson/primitive"

// Comment for Matric Num this is needed to check against DB of students who are taking the module.
// If a student is authorised to take the module then they can sign up for a account
// To prevent a non authorised user from making an account, we update our DB to say if it has or hasnt alr made the account.
// Email is used for backup services/ OTP/ forget passwords scenario

type CreateUsersRequest struct {
	// Id        primitive.ObjectID `json:"id,omitempty"`
	Name      string `json:"name,omitempty" validate:"required"`
	Email     string `json:"email,omitempty" validate:"required"`
	Title     string `json:"title,omitempty" validate:"required"`
	MatricNum string `json:"matricNum,omitempty" `
	Password  string `json:"password,omitempty" validate:"required"`
}
