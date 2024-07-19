package util

import (
	"fmt"
	"strings"

	"github.com/alpha_main/models"
)

func (d *Util) BuildUpdateQuery(valuesToWork []string, verify models.Verify) string {

	var set []string

	for i := 0; i < len(valuesToWork); i++ {
		preQuery := strings.Split(valuesToWork[i], ";")

		if len(preQuery) == 3 {
			set = append(set, fmt.Sprintf("%v = '%v'", preQuery[2], strings.Replace(preQuery[1], "'", "`", -1)))
			continue
		}

		if len(preQuery) == 2 {
			if strings.Contains(preQuery[1], "to_date") {
				set = append(set, fmt.Sprintf("%v = %v", preQuery[0], preQuery[1]))
			} else {
				set = append(set, fmt.Sprintf("%v = '%v'", preQuery[0], strings.Replace(preQuery[1], "'", "`", -1)))
			}
			continue
		}

	}

	allSets := strings.Join(set, ",")

	colums := strings.Split(verify.MainColumnDatabase, ",")
	values := strings.Split(fmt.Sprintf("%v", verify.Value), ",")

	var wheres []string

	for k, v := range colums {
		wheres = append(wheres, fmt.Sprintf("lower(%v)=lower('%v') and", v, values[k]))
	}

	where := strings.Join(wheres, " ")
	where = where[:len(where)-3]

	return fmt.Sprintf("update %v set %v where %v ", verify.TableName, allSets, where)
}

func (u *Util) ChangeFieldsToUpdate(v []string) []string {

	notAcceptedFields := []string{"id_pessoa", "idpessoa", "id_pe_end", "indice", "id_grupo", "id_pessoa_end", "id_fone"}
	var result []string

	for i := 0; i < len(v); i++ {
		found := false
		for n := 0; n < len(notAcceptedFields); n++ {
			if v[i] == notAcceptedFields[n] {
				found = true
				break
			}
		}
		if !found {
			result = append(result, v[i])
		}
	}

	return result
}
