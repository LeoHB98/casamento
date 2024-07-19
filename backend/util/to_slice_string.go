package util

import (
	"reflect"
	"strings"
)

func (t *Util) ToSliceString(values interface{}) []string {

	refl := reflect.ValueOf(values)
	var array []string

	if values == nil {
		return nil
	}

	if refl.Kind() == reflect.Slice {

		for j := 0; j < refl.Len(); j++ {
			array = append(array, t.ToSliceString(refl.Index(j).Interface())...)
		}
		return array
	}

	if refl.Kind() == reflect.Struct {

		for str := 0; str < refl.NumField(); str++ {
			array = append(array, t.ToSliceString(refl.Type().Field(str).Name)...)
		}
		return array
	}

	if refl.Kind() == reflect.Map {

		for _, key := range refl.MapKeys() {
			// mapValue := refl.MapIndex(key).Interface()
			mapName := strings.ToLower(key.String())
			array = append(array, mapName)
		}

		return array
	}

	if refl.Kind() == reflect.Pointer {

		return t.ToSliceString(refl.Elem().Interface())

	}

	if refl.Kind() == reflect.String {

		return []string{refl.Interface().(string)}

	}

	return nil
}
