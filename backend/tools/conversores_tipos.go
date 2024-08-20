package tools

import (
	"fmt"
	"reflect"
	"strconv"
)

type T any

func Conversor[R any](valor T) R {

	var err error
	var tipoRequerido R
	var valorConvertido interface{}

	defer func() {
		CheckErr(err)
	}()

	switch any(tipoRequerido).(type) {

	case string:
		valorConvertido = (ConversorParaString(valor))

	case int, int8, int16, int32, int64:

		valorConvertido, err = ConversorParaInt(valor)

	case float32, float64:
		valorConvertido, err = ConversorParaFloat(valor)

	default:
		err = (fmt.Errorf("tipo para conversao nao especificado"))
		return tipoRequerido
	}

	return valorConvertido.(R)
}

var Inteiro = map[reflect.Kind]bool{
	reflect.Int:   true,
	reflect.Int8:  true,
	reflect.Int16: true,
	reflect.Int32: true,
	reflect.Int64: true,
}
var PontoFlutuante = map[reflect.Kind]bool{
	reflect.Float32: true,
	reflect.Float64: true,
}

func ToPrt[V T](val V) *V {
	return &val
}

func ConversorPorReflect(t reflect.Type, valor T) reflect.Value {

	tipo := t.Kind()
	var valorConvertido interface{}

	switch {

	case tipo == reflect.String:
		valorConvertido = Conversor[string](valor)

	case Inteiro[tipo]:
		valorConvertido = Conversor[int](valor)

	case PontoFlutuante[tipo]:
		valorConvertido = Conversor[float64](valor)

	default:
		CheckErr(fmt.Errorf("tipo para conversao nao especificado"))
	}

	return reflect.ValueOf(valorConvertido)

}

func ConversorParaString(valor T) string {

	valorRefletido := reflect.ValueOf(valor)

	if valorRefletido.Kind() == reflect.Ptr {
		valorRefletido = valorRefletido.Elem()
	}

	return fmt.Sprintf("%v", valorRefletido.Interface())
}

func ConversorParaFloat(valor T) (float64, error) {

	valorRefletido := reflect.ValueOf(valor)

	if valorRefletido.Kind() == reflect.Ptr {
		valorRefletido = valorRefletido.Elem()
	}

	if valorRefletido.Kind() != reflect.String {
		return 0, fmt.Errorf("tipo para conversao nao suportado %v", valorRefletido.Kind())
	}

	return strconv.ParseFloat(valorRefletido.String(), 64)

}

func ConversorParaInt(valor T) (int, error) {

	valorRefletido := reflect.ValueOf(valor)

	if valorRefletido.Kind() == reflect.Ptr {
		valorRefletido = valorRefletido.Elem()
	}

	if valorRefletido.Kind() != reflect.String {
		return 0, fmt.Errorf("tipo para conversao nao suportado %v", valorRefletido.Kind())
	}

	return strconv.Atoi(valorRefletido.String())

}

func ConversorParaInt64(valor T) (int64, error) {
	inteiro, err := ConversorParaInt(valor)
	return int64(inteiro), err
}
