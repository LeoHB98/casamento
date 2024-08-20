package tools

import (
	"fmt"
	"log"
	"runtime/debug"
)

func CheckErr(err error) {
	if err != nil {
		err = fmt.Errorf(string(debug.Stack()), err)
		log.Panic("ERROR: " + err.Error())
	}
}
