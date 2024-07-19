package util

import (
	"crypto/rand"
)

func (u *Util) GenerateRandomKey(lenght int) (string, error) {

	keySpace := make([]byte, lenght)
	_, err := rand.Read(keySpace)
	if err != nil {
		return "", err
	}

	return string(keySpace), nil

}
