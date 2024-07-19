package util

import (
	"fmt"
	"reflect"
	"strings"
	"time"

	"github.com/alpha_main/models"
)

func (u *Util) CompareValues(values map[string]interface{}, fieldsRequireds []string, verify models.Verify) []string {

	var valueReturn []string

	if verify.Exists {
		fieldsRequireds = u.ChangeFieldsToUpdate(fieldsRequireds)
	}

	for k, v := range values {

		for f := 0; f < len(fieldsRequireds); f++ {
			if fieldsRequireds[f] == k {

				if reflect.ValueOf(v).Kind() == reflect.Pointer {

					if !reflect.ValueOf(v).IsNil() {
						value := reflect.ValueOf(v).Elem().Interface()

						if !u.CheckIsNil(value) {

							if vt, ok := value.(time.Time); ok {
								value = u.TimeBuilder(fmt.Sprintf("%v", vt))
							}

							if vs, ok := value.(string); ok {
								if strings.Contains(strings.ToLower(vs), "utc") {
									value = u.TimeBuilder(vs)
								}
							}

							valueReturn = append(valueReturn, fmt.Sprintf("%v;%v", k, value))
							break
						}

					}
				} else {
					if !u.CheckIsNil(v) {
						valueReturn = append(valueReturn, fmt.Sprintf("%v;%v", k, v))
						break
					}
				}
			}
		}
	}

	return valueReturn
}

func (u *Util) TimeBuilder(v string) string {

	strSlice := make([]string, 0, len(v))

	for _, char := range v {
		strSlice = append(strSlice, string(char))
	}

	var time []string
	for i := 0; i < len(strSlice); i++ {

		if i < 20 {
			time = append(time, strSlice[i])
		} else {
			break
		}

	}

	return fmt.Sprintf("to_date('%v', 'YYYY-MM-DD HH24:MI:SS')", strings.Replace(strings.Join(time, ""), ".", "", -1))
}

func (u *Util) CheckIsNil(v interface{}) bool {

	if vs, ok := v.(string); ok {
		if vs == "" {
			return true
		} else {
			return false
		}
	}
	if vf, ok := v.(float64); ok {
		if vf == 0 {
			return true
		} else {
			return false
		}
	}
	if vi, ok := v.(int64); ok {
		if vi == 0 {
			return true
		} else {
			return false
		}
	}

	if vtp, ok := v.(*time.Time); ok {
		if vtp == nil {
			return true
		} else {
			return false
		}
	}

	if vt, ok := v.(time.Time); ok {
		if reflect.ValueOf(vt).Interface() == nil {
			return true
		} else {
			return false
		}
	}

	return true
}
