package util

import (
	"reflect"
	"strings"
)

func (t *Util) UnstackedStruct(values interface{}, tagRequired string, filtredByTag bool) (map[string]interface{}, []string) {

	rfctValue := reflect.ValueOf(values)

	filtredValues := make(map[string]interface{})
	var tags []string

	if rfctValue.Kind() == reflect.Struct {
		for i := 0; i < reflect.ValueOf(values).NumField(); i++ {

			key := strings.ToLower(rfctValue.Type().Field(i).Name)
			tag := reflect.ValueOf(values).Type().Field(i).Tag.Get(tagRequired)

			if filtredByTag {
				if tag != "" {
					filtredValues[tag] = rfctValue.Field(i).Interface()
					tags = append(tags, tag)
				}
			} else {
				filtredValues[key] = rfctValue.Field(i).Interface()
			}

		}
	}
	return filtredValues, tags
}
