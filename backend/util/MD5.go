package util

import (
	"crypto/md5"
	"encoding/hex"
)

func (t *Util) CreateMD5Hash(data string) string {

	hash := md5.New()
	hash.Write([]byte(data))
	hashB := hash.Sum(nil)

	return hex.EncodeToString(hashB)

}
