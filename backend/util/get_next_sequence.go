package util

import (
	"database/sql"
	"fmt"

	"github.com/alpha_main/messages"
)

func (u *Util) GetNextSequenceTable(fieldTarget, tableName string) (int64, error) {

	result, err := u.TX.Query(fmt.Sprintf("	select nvl(max(%v), 0)+1 from %v order by %v", fieldTarget, tableName, fieldTarget))
	if err != nil && sql.ErrNoRows != err {
		return 0, err
	}

	defer result.Close()

	if result.Next() {
		var idResult int64
		err = result.Scan(&idResult)
		if err != nil {
			return 0, err
		}
		return idResult, nil
	}

	return 0, fmt.Errorf(fmt.Sprintf(messages.ERROR_GET_NEXT_SEQUENCE, tableName))

}
