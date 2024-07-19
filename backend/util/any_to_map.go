package util

import (
	"reflect"
	"strings"
	"time"

	"gopkg.in/guregu/null.v4"
)

// AnyToMap tenta converter qualquer estrutura para um map[string]interface{}. Caso seja passado valor verdadeiro no segundo parametro, a chave de valores sera convertida para lowercase.
func (u *Util) AnyToMap(data interface{}, keyLower bool) interface{} {

	any := reflect.ValueOf(data)
	kinda := any.Kind()
	fields := make(map[string]interface{})

	if kinda == reflect.Slice {

		var arrFields []interface{}
		for i := 0; i < any.Len(); i++ {
			arrFields = append(arrFields, u.AnyToMap(any.Index(i).Interface(), keyLower))
		}
		fields[any.Type().Name()] = arrFields
		return fields

	} else if kinda == reflect.Struct {
		if any.Type() == reflect.TypeOf(time.Time{}) {
			return any.Interface()
		}
		for s := 0; s < any.NumField(); s++ {
			valueStrc := any.Field(s).Interface()
			if keyLower {
				fields[strings.ToLower(any.Type().Field(s).Name)] = u.AnyToMap(valueStrc, keyLower)
			} else {
				fields[any.Type().Field(s).Name] = u.AnyToMap(valueStrc, keyLower)
			}
		}
		return fields

	} else if kinda == reflect.Pointer {
		if any.IsNil() {
			return nil
		} else {
			return u.AnyToMap(any.Elem().Interface(), keyLower)
		}

	} else if kinda == reflect.Map {

		for _, key := range any.MapKeys() {
			mapValue := any.MapIndex(key).Interface()
			if keyLower {
				fields[strings.ToLower(key.Interface().(string))] = u.AnyToMap(mapValue, keyLower)
			} else {
				fields[key.Interface().(string)] = u.AnyToMap(mapValue, keyLower)
			}
		}

		return fields
	} else {

		valuePtr := any.Interface()

		if itg, ok := valuePtr.(int64); ok {
			return itg
		} else if stg, ok := valuePtr.(string); ok {
			return stg
		} else if flt, ok := valuePtr.(float64); ok {
			return flt
		} else if nullS, ok := valuePtr.(null.String); ok {
			return nullS
		} else if nullF, ok := valuePtr.(null.Float); ok {
			return nullF
		} else if nullI, ok := valuePtr.(null.Int); ok {
			return nullI
			//**verificar se o tipo de dado que vem da consulta
		} else if godNum, ok := valuePtr.(string); ok {
			return godNum
		}
	}

	return nil
}
