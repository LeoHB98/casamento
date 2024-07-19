package util

import (
	"fmt"
	"time"

	"github.com/alpha_main/config"
	"github.com/jlaffaye/ftp"
	"github.com/secsy/goftp"
)

// ConnectFTP realiza a conexão com o servidor FTP
func ConnectFTP(u *config.FTP) (*ftp.ServerConn, error) {
	hostPort := fmt.Sprintf("%v:%v", u.FtpHost, u.FtpPort)

	c, err := ftp.Dial(hostPort, ftp.DialWithTimeout(60*time.Second))
	if err != nil {
		return nil, fmt.Errorf("erro ao conectar no ftp: %v", err)
	}

	err = c.Login(u.FtpUser, u.FtpPass)
	if err != nil {
		return nil, fmt.Errorf("erro ao efetuar login no ftp: %v", err)
	}

	return c, nil
}

func ConnectFTPGOLib(u *config.FTP) (*goftp.Client, error) {

	gftp := goftp.Config{User: u.FtpUser, Password: u.FtpPass, Timeout: 60}
	ftp, err := goftp.DialConfig(gftp, u.FtpHost)
	if err != nil {
		return nil, err
	}
	return ftp, nil
}
