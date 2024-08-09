package tools

import (
	"crypto/rand"
	"math/big"
)

const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

// GenerateRandomKey gera uma chave aleatória de um comprimento especificado
func GenerateRandomKey(length int) (string, error) {
	key := make([]byte, length)
	for i := range key {
		num, err := rand.Int(rand.Reader, big.NewInt(int64(len(charset))))
		if err != nil {
			return "", err
		}
		key[i] = charset[num.Int64()]
	}
	return string(key), nil
}
