package util

import (
	"fmt"
	"log"
	"reflect"
	"strconv"
	"strings"
	"time"
)

func (u *Util) ToString(data interface{}) string {

	var newData string

	if d, ok := data.(string); ok {
		newData = d

	} else if d, ok := data.(float64); ok {
		newData = strconv.FormatFloat(d, 'f', 0, 64)
	}

	return u.CleanString(newData)

}

var Numeric = map[reflect.Kind]bool{
	reflect.Uint:   true,
	reflect.Uint8:  true,
	reflect.Uint16: true,
	reflect.Uint32: true,
}

func (u *Util) ConvertInString(value interface{}) string {

	if val, ok := value.(string); ok {
		return val
	}

	if val, ok := value.(float64); ok {
		return strconv.FormatFloat(val, 'f', 0, 64)
	}

	if val, ok := value.(int64); ok {
		return strconv.Itoa(int(val))
	}

	log.Println(reflect.TypeOf(value).Kind())
	if Numeric[reflect.TypeOf(value).Kind()] {
		return fmt.Sprintf("%v", value.(string))
	}

	return "n"
}

func (u *Util) ConvertDateToString(date, layout string, timeRequired time.Duration) string {

	t, err := time.ParseInLocation("2006-01-02", date, time.Local)
	if err != nil {
		t, err = time.ParseInLocation("02.01.2006", date, time.Local)
		if err != nil {
			return ""
		}
	}

	if timeRequired == 0 {
		return t.Format(layout)
	}

	return t.Add(timeRequired).Format("20060102")
}

func (u *Util) CleanString(data string) string {

	strSlice := make([]string, 0, len(data))

	for _, char := range data {
		strSlice = append(strSlice, string(char))
	}

	var ns []string
	for i := 0; i < len(strSlice); i++ {
		if strSlice[i] == "[" || strSlice[i] == "]" {
			continue
		} else {
			ns = append(ns, strSlice[i])
		}
	}

	return strings.Join(ns, "")
}
