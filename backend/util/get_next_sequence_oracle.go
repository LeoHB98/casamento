package util

import "fmt"

func (u *Util) GetNextSequenceOracle(sequence string) (int64, error) {
	var idSeq int64
	var err error
	sql := fmt.Sprintf("select %s.nextval from dual", sequence)
	if u.TX != nil {
		err = u.TX.QueryRow(sql).Scan(&idSeq)
		if err != nil {
			return 0, fmt.Errorf("erro ao buscar sequência >> %v: %v", sequence, err)
		}
	} else {
		err = u.DB[0].Get(&idSeq, sql)
		if err != nil {
			return 0, fmt.Errorf("erro ao buscar sequência >> %v: %v", sequence, err)
		}
	}

	return idSeq, nil
}
