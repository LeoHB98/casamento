package util

import (
	"encoding/xml"
	"fmt"
	"os"
)

func (u *Util) CreateFileXML(nameFile, stdEnd string, data interface{}) error {

	file, err := os.Create(nameFile)
	if err != nil {
		return err
	}
	defer file.Close()

	encoder := xml.NewEncoder(file)
	encoder.Indent("", "  ")

	err = encoder.EncodeToken(xml.StartElement{Name: xml.Name{Local: "toRemove"}})
	if err != nil {
		return err
	}

	err = encoder.Encode(data)
	if err != nil {
		return err
	}

	err = encoder.EncodeToken(xml.EndElement{Name: xml.Name{Local: "toRemove"}})
	if err != nil {
		return err
	}

	err = encoder.Flush()
	if err != nil {
		return err
	}

	file, err = os.Open(nameFile)
	if err != nil {
		return err
	}

	err = u.WriteInServerFTP(file, nameFile)
	if err != nil {
		return err
	}

	return nil
}

func (u *Util) WriteInServerFTP(file *os.File, nameFile string) error {

	ftp, err := ConnectFTP(u.FTP)
	if err != nil {
		return err
	}

	dir := "/homologacao/leonardo"

	cDir, err := ftp.CurrentDir()
	if err != nil {
		return err
	}

	if cDir != dir {
		err = ftp.ChangeDir("homologacao/leonardo/")
		if err != nil {
			return err
		}
	}

	err = ftp.Stor(fmt.Sprintf("%v", nameFile), file)
	if err != nil {
		return err
	}

	return nil
}
