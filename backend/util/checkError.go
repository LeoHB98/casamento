package util

import (
	"github.com/alpha_main/models"
)

func (u *Util) CheckErrors(data interface{}) bool {

	if logResp, ok := data.([]models.LogResponse); ok {
		for _, v := range logResp {
			if v.Code > 400 {
				return true
			}
		}
	}

	if _, ok := data.(error); ok {
		return true
	}
	return false
}
