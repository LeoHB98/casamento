package models

type GenericResponse struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}
