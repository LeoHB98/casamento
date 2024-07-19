package config

import (
	"flag"
	"fmt"

	"github.com/spf13/viper"
)

func New(devMode bool) (*Config, error) {
	if !devMode {
		flag.BoolVar(&devMode, "devmode", false, "Adicionar esta flag para modo de desenvolvimento.")
		flag.Parse()
	}

	if devMode {
		fmt.Println("#### Ambiente de desenvolvimento ####")
	}

	viper.SetConfigName("app.env")
	viper.SetConfigType("env")
	viper.AddConfigPath("../env")

	err := viper.ReadInConfig()
	if err != nil {
		return nil, fmt.Errorf("erro ao ler config: %w", err)
	}

	return &Config{

		AllDbsConfig: &AllDbsConfig{

			Oracle: []DBConfigOracle{
				{
					DbUser: viper.GetString("DB_USER"),
					DbPass: viper.GetString("DB_PASS"),
					DbHost: viper.GetString("DB_HOST"),
					DbPort: viper.GetInt("DB_PORT"),
					DbSid:  viper.GetString("DB_SID"),
				},
			},
			Postgres: &DbConfigPostgres{
				DbName:   viper.GetString("DB_NAME_P"),
				User:     viper.GetString("DB_USER_P"),
				Password: viper.GetString("DB_PASS_P"),
			}},

		Email: &Email{
			From: viper.GetString("FROM"),
			SMTP: viper.GetString("SMTP"),
			Port: viper.GetString("PORT"),
			Pass: viper.GetString("PASS"),
			Tls:  viper.GetString("TLS"),
			TO:   viper.GetString("TO"),
		},
		EmailLog: &Email{
			From: viper.GetString("FROM"),
			SMTP: viper.GetString("SMTP"),
			Port: viper.GetString("PORT"),
			Pass: viper.GetString("PASS"),
			Tls:  viper.GetString("TLS"),
			TO:   viper.GetString("TO"),
		},
		FTP: &FTP{
			FtpHost: viper.GetString("FTP_HOST"),
			FtpPort: viper.GetString("FTP_PORT"),
			FtpUser: viper.GetString("FTP_USER"),
			FtpPass: viper.GetString("FTP_PASS"),
		},
		Login: &Login{
			User:     "alpha_integration",
			Password: "625e0c3f22d57fdfc6eeae9583ddaa0a",
		},
		AuthAlpha:          "123456",
		ParamSigcomIdEmail: viper.GetString("PARAM_EMAIL"),
		PortService:        viper.GetInt("PORT_SERVICE"),
		Company:            viper.GetString("COMPANY"),
		DevMode:            devMode,
	}, nil
}
