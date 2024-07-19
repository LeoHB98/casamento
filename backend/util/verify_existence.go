package util

import (
	"fmt"
	"strings"

	"github.com/alpha_main/models"
)

func (u *Util) VerifyExistence(verify models.Verify) (bool, error) {

	result, err := u.SearchValue("count(*)", verify.TableName, verify.MainColumnDatabase, verify.Value)
	if err != nil {
		return false, err
	}

	if result, ok := result.(int64); ok {
		if result != 0 {
			return true, nil
		} else {
			return false, nil
		}
	}

	return false, fmt.Errorf("could not possible determine if exists or not >> %v", verify.TableName)

}

// func (u *Util) TakeIdRq(verify models.Verify) (null.Int, error) {

// }

// o nome da coluna é nome, o que inviabiliza o uso da anytoquery já que a mesma se baseia no uso d etags de forma unica, então precisa d euma troca de nome para que caso exista uma necessidade seja feita a troca de algum campo
func (u *Util) ChangeColumn(fieldToCheck, fieldToChange string, queries []string) []string {

	var q []string

	for _, query := range queries {
		if strings.ContainsAny(query, fieldToCheck) {
			q = append(q, strings.Replace(query, fieldToCheck, fieldToChange, -1))
		}
	}

	return q
}
