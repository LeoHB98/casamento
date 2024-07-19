package util

import (
	"fmt"
	"strings"
)

func (fl *Util) AddChar(totalQt int64, chatToAdd, value string) string {

	strSlice := make([]string, 0, len(value))

	for _, char := range value {
		strSlice = append(strSlice, string(char))
	}

	var prefix, suffix []string
	for i := 0; i < int(totalQt); i++ {
		if i < len(strSlice) {
			suffix = append(suffix, strSlice[i])
		} else {
			prefix = append(prefix, chatToAdd)
		}
	}

	return fmt.Sprintf("%v%v", strings.Join(prefix, ""), strings.Join(suffix, ""))
}
