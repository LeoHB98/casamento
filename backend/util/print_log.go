package util

import (
	"log"
)

// func (t *Util) PrintLogs(payload []models.LogResponse) {

// 	log.Println("PrintLogs actived")

// 	for _, v := range payload {

// 		mgmLog := fmt.Sprintf("%v: %v - %v - %v", v.Code, v.Field, v.Message, v.Errr.Error())

// 		bytePayload, err := json.MarshalIndent(mgmLog, " ", "  ")
// 		if err != nil {
// 			log.Println(fmt.Errorf("%v:%v", ERROR_PRINT_LOG, err))
// 		}

// 		log.Println(string(bytePayload))

// 	}

// }

func (u *Util) PrintMessage(varMgm string) {

	log.Printf("%v was started \n", varMgm)

}
