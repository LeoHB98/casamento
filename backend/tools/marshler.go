package tools

import (
	"encoding/json"
	"log"
)

func Marshller(data interface{}) []byte {
	d, err := json.Marshal(data)

	log.Println(string(d))
	CheckErr(err)
	return d
}
