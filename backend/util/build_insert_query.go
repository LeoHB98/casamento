package util

import (
	"fmt"
	"strings"
)

func (d *Util) BuildInsertQuery(valuesToWork []string, tableName string) string {
	var columns, values []string

	for i := 0; i < len(valuesToWork); i++ {

		preQuery := strings.Split(valuesToWork[i], ";")

		if len(preQuery) == 3 {
			columns = append(columns, fmt.Sprintf("%v", preQuery[2]))
			values = append(values, fmt.Sprintf("'%v'", strings.Replace(preQuery[1], "'", "`", -1)))
			continue
		}

		if len(preQuery) == 2 {
			columns = append(columns, fmt.Sprintf("%v", preQuery[0]))
			if strings.Contains(preQuery[1], "to_date") {
				values = append(values, fmt.Sprintf("%v", (preQuery[1])))
			} else {
				values = append(values, fmt.Sprintf("'%v'", strings.Replace(preQuery[1], "'", "`", -1)))
			}
			continue
		}

	}

	allColumns := strings.Join(columns, ",")
	allValues := strings.Join(values, ",")

	return fmt.Sprintf("insert into %v (%v) values(%v)", tableName, allColumns, allValues)
}
