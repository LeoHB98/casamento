package util

import (
	"log"
	"reflect"

	"github.com/alpha_main/models"
)

// Essa função tem como objetivo criar uma ou varias execucoes para o banco. Se caso nao determinado anteriormente, sera
// feito a consulta se existe ou nao o registro no tabela requerida, pelo modelo de verify{}, cuja a funcionalidade serve pra diminuir a quantidade de campos. Eh obrigatorio conter a tabela trabalhada, o campo principal que sera trabalhado, como tambem os valores para serem parametrizados. Essa funcao aceita os valores em forma de map, valores em forma de uma estrutura ou uma lista de ambos
func (u *Util) AnyToQuery(values, required interface{}, verify models.Verify) []string {

	rfctValue := reflect.ValueOf(values)
	var err error
	var rq, queries, valuesToWork []string

	//caso ja tenha sido feita a verificacao antes de ser feito a chamada dessa funcao
	if !verify.Checked {
		verify.Exists, err = u.VerifyExistence(verify)
		if err != nil {
			log.Fatal(err)
		}
	}

	if required != nil {
		rq = u.ToSliceString(required)
	}

	if rfctValue.Kind() == reflect.Slice {
		for j := 0; j < rfctValue.Len(); j++ {
			each := rfctValue.Index(j).Interface()
			queries = append(queries, u.AnyToQuery(each, required, verify)...)
		}
		return queries

	} else if rfctValue.Kind() == reflect.Struct {

		values, newRq := u.UnstackedStruct(values, "db", true)

		if len(rq) == 0 {
			rq = newRq
		}

		valuesToWork = u.CompareValues(values, rq, verify)

		queries = append(queries, u.InOrUp(valuesToWork, verify))
		return queries

	} else if rfctValue.Kind() == reflect.Map {

		valuesToWork = u.CompareValues(values.(map[string]interface{}), rq, verify)
		queries = append(queries, u.InOrUp(valuesToWork, verify))
		return queries

	} else {
		return []string{"values need to be a map or a struct"}
	}

}
