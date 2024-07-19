package util

import "strings"

func (t *Util) DeleteInArray(FrtArray, SecArray []string) []string {

	j := 0
	for j < len(FrtArray) {
		i := 0
		for i < len(SecArray) {
			value1 := FrtArray[j]
			value2 := SecArray[i]

			if strings.EqualFold(value1, value2) {

				SecArray = append(SecArray[:i], SecArray[i+1:]...)
				i = -1
				j = 0

			}
			i++
		}
		j++
	}

	return SecArray
}
