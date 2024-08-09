package tools

import (
	"strings"
)

// Centraliza as operacoes em uma string com o objetivo de deixar o mais reutilizavel possivel
func CleanString(s string) string {
	s = strings.ToUpper(s)
	s = strings.TrimSpace(s)
	s = strings.Replace(s, ",", "", -1)
	s = strings.Replace(s, ".", "", -1)
	s = strings.Replace(s, "\n", "", -1)
	return s
}
