package util

import (
	"context"
	"fmt"
	"strings"
	"time"

	"gopkg.in/guregu/null.v4"
)

func (u *Util) SearchValue(fieldSelected, tableName, whereCondition string, whereValue interface{}) (interface{}, error) {

	var result null.Int
	var err error

	columns := strings.Split(whereCondition, ",")

	values := strings.Split(fmt.Sprintf("%v", whereValue), ",")

	var wheres []string

	for k, v := range columns {
		wheres = append(wheres, fmt.Sprintf("lower(%v)=lower('%v') and", v, values[k]))
	}

	where := strings.Join(wheres, " ")
	where = where[:len(where)-3]
	// teste := strings.Repeat("%v,", len(values))
	// teste = teste[:len(teste)-1]

	query := fmt.Sprintf("select %v from %v where %v ", fieldSelected, tableName, where)

	ctx := context.Background()
	ctx, canc := context.WithTimeout(ctx, 30*time.Second)
	defer canc()

	if u.TX != nil {
		err = u.TX.QueryRowContext(ctx, query).Scan(&result)
		if err != nil {
			return 0, err
		}
	} else {
		err = u.DB[0].Get(&result, query)
		if err != nil {
			return 0, err
		}
	}

	return result.Int64, nil
}

func (u *Util) SearchValues(fieldSelected, tableName, whereCondition string, whereValue interface{}, dest interface{}) (interface{}, error) {

	var err error

	columns := strings.Split(whereCondition, ",")

	values := strings.Split(fmt.Sprintf("%v", whereValue), ",")

	var wheres []string

	for k, v := range columns {
		wheres = append(wheres, fmt.Sprintf("lower(%v)=lower('%v') and", v, values[k]))
	}

	where := strings.Join(wheres, " ")
	where = where[:len(where)-3]
	// teste := strings.Repeat("%v,", len(values))
	// teste = teste[:len(teste)-1]

	query := fmt.Sprintf("select * from %v where %v ", tableName, where)

	err = u.DB[0].Get(&dest, query)
	if err != nil {
		return 0, err
	}

	return dest, nil
}
