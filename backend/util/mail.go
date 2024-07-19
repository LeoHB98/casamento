package util

import (
	"encoding/json"
	"fmt"
)

func (t *Util) AddMail(payload interface{}) error {
	rJSON, err := json.MarshalIndent(payload, " ", "  ")
	if err != nil {
		return err
	}

	err = t.SendMailLog(fmt.Sprintf("%v", t.Company), string(rJSON))
	if err != nil {
		return err
	}
	return nil
}

func (t *Util) SendMailLog(subject, message string) error {
	return nil
}
