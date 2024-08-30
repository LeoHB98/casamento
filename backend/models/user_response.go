package models

type ResponseUser struct {
	UserResponse []UserResponse `xml:"error,omitempty"`
}

type UserResponse struct {
	Message      string `json:"message"`
	Code         int    `json:"code"`
	ReferenceKey string `json:"referenceKey"`
	Field        string `json:"field"`
	Value        string `json:"value"`
	Route        string `json:"route"`
	Type         int    `json:"-"`
}
