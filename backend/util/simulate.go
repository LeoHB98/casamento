package util

import (
	"log"
	mr "math/rand"
	"strconv"
	"time"
)

func (u *Util) SimulateIdString() string {

	const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	seed := mr.NewSource(time.Now().UnixNano())
	randGen := mr.New(seed)

	b := make([]byte, 4)
	for i := range b {
		lenCharset := len(charset)
		teste := charset[randGen.Intn(lenCharset)]
		b[i] = teste
	}

	key := string(b)

	//com a criação de um slice de byte, essa iteração seleciona dentro do slice de caracteres de charset, seleciona algum numero que pode ser selecionado com base no tamnanho maximo que essa mesma consntante tem, em byte, que será representado pela tabela ASCII. A semente do tempo é para realmente garantir que a chave será aleatoria, ja que unixnano retrata em segundos a transformação do tempo desde de 1970.

	return key

}

func (u *Util) SimulateIdNumeric() float64 {

	seed := mr.NewSource(time.Now().UnixNano())
	randGen := mr.New(seed)
	num := mr.Intn(randGen.Intn(10000))
	fKey, err := strconv.ParseFloat(strconv.Itoa(num), 64)
	if err != nil {
		if u.CheckErrors(err) {
			log.Println(err)
		}
	}

	return fKey

}
