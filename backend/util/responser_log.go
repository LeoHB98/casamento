package util

import (
	"encoding/json"
	"encoding/xml"
	"fmt"
	"log"
	"net/http"
	"reflect"
	"strings"

	"github.com/alpha_main/models"
)

func (u *Util) Logger(w http.ResponseWriter, data interface{}, showEverything bool) {

	var development_errs []string
	var userSucessResponse, userErrorResponse []models.UserResponse

	if logResponse, ok := data.([]models.LogResponse); ok {
		sucess, warming, errors := u.DivideResponse(logResponse)
		userSucessResponse, userErrorResponse, development_errs = u.PrepareResponse(sucess, warming, errors)

		if w != nil {
			if len(userErrorResponse) != 0 {
				u.DoResponse(w, userErrorResponse, showEverything)
			} else {
				u.DoResponse(w, userSucessResponse, showEverything)
			}
		}

	} else if err, ok := data.(error); ok {
		development_errs = append(development_errs, err.Error())

	} else if errs, ok := data.([]error); ok {
		for i := 0; i < len(errs); i++ {
			development_errs = append(development_errs, errs[i].Error())
		}

	} else {

		log.Println("LOGGER >>> value recieved isnt a slice of logResponse or a error type")
		log.Println(data)
	}

	if len(development_errs) != 0 {
		err := u.AddMail(development_errs)
		if err != nil {
			log.Printf("COULD NOT SEND EMAIL - %v", err)
		}
		log.Println(development_errs)
	}

}

func (u *Util) DivideResponse(response []models.LogResponse) ([]models.LogResponse, []models.LogResponse, []models.LogResponse) {
	var sucess, warming, errror []models.LogResponse

	for _, v := range response {
		if v.Code < 400 {
			if v.Code == 202 {
				warming = append(warming, v)
			} else {
				sucess = append(sucess, v)
			}
		} else {
			errror = append(errror, v)
		}
	}

	return sucess, warming, errror
}

func (u *Util) PrepareResponse(sucess, warnings, errors []models.LogResponse) ([]models.UserResponse, []models.UserResponse, []string) {

	var userSucessResponse, userErrorResponse []models.UserResponse
	var dev_errors []string

	if len(errors) != 0 {
		for _, err := range errors {
			userErrorResponse = append(userErrorResponse, models.UserResponse{Code: err.Code, Message: err.Message, ReferenceKey: err.ReferenceKey, Field: err.Field, Value: err.Value, Route: err.Route, Type: err.Type})
			if err.Code >= 500 {
				dev_errors = append(dev_errors, u.ErrorDevBuilder(err))
			}

		}
	}

	if len(warnings) != 0 {
		for _, warning := range warnings {
			userSucessResponse = append(userSucessResponse, models.UserResponse{Code: warning.Code, Message: warning.Message, ReferenceKey: warning.ReferenceKey, Field: warning.Field, Value: warning.Value, Route: warning.Route, Type: warning.Type})
		}
	}

	if len(sucess) != 0 {
		for _, ok := range sucess {
			userSucessResponse = append(userSucessResponse, models.UserResponse{Code: ok.Code, Message: ok.Message, ReferenceKey: ok.ReferenceKey, Field: ok.Field, Value: ok.Value, Route: ok.Route, Type: ok.Type})
		}
	}

	return userSucessResponse, userErrorResponse, dev_errors

}

func (t *Util) ErrorDevBuilder(data interface{}) string {

	var devMgm []string

	d := reflect.ValueOf(data)

	if d.Kind() == reflect.Struct {

		for i := 0; i < d.NumField(); i++ {
			key := d.Type().Field(i).Name
			value := d.Field(i).Interface()
			if value != nil && value != "" && value != 0 {
				devMgm = append(devMgm, fmt.Sprintf("%v - %v // ", key, value))
			}
		}

	}

	return strings.Join(devMgm, "")
}

func (u *Util) DoResponse(w http.ResponseWriter, response []models.UserResponse, showAll bool) {

	typeResp := TYPERESPONSE
	if typeResp == "" {
		typeResp = "json"
	}

	if !showAll {
		response = u.DecideUniqueResponse(response)
	}

	if w != nil {
		toByte := u.DecideTypeResponse(models.ResponseUser{UserResponse: response}, typeResp)
		log.Println(string(toByte))

		w.Header().Set("Content-Type", fmt.Sprintf("application/%v;charset=utf-8", typeResp))
		w.WriteHeader(http.StatusMultipleChoices)
		if TYPERESPONSE == "xml" {
			w.Write([]byte(fmt.Sprintf(`%v`, string(toByte))))
		} else {
			w.Write([]byte(fmt.Sprintf(`{"response": %v}`, string(toByte))))
		}
	}

}

func (u *Util) DecideUniqueResponse(response []models.UserResponse) []models.UserResponse {

	var resp, type1, type2, type3, type4, type0 []models.UserResponse

	for _, v := range response {
		if v.Type == 1 {
			type1 = append(type1, v)
		}
		if v.Type == 2 {
			type2 = append(type2, v)
		}

		if v.Type == 3 {
			type3 = append(type3, v)
		}

		if v.Type == 4 {
			type4 = append(type4, v)
		}

		if v.Type == 0 {
			type0 = append(type0, v)
		}

	}

	if len(type1) != 0 {
		resp = append(resp, type1[0])
	}
	if len(type2) != 0 {
		resp = append(resp, type2[0])
	}
	if len(type3) != 0 {
		resp = append(resp, type3[0])
	}
	if len(type4) != 0 {
		resp = append(resp, type4[0])
	}

	if len(type0) != 0 {
		resp = append(resp, type0...)
	}

	return resp
}

func (u *Util) DecideTypeResponse(data interface{}, typeResp string) []byte {

	var toByte []byte
	var err error
	if typeResp == "json" {
		toByte, err = json.MarshalIndent(data, " ", "  ")
		if err != nil {
			log.Println(err)
			return nil
		}
	}

	if typeResp == "xml" {
		toByte, err = xml.MarshalIndent(data, " ", "  ")
		if err != nil {
			log.Println(err)
			return nil
		}

	}

	return toByte

}
