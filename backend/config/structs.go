package config

type Email struct {
	From string
	SMTP string
	Port string
	Pass string
	Tls  string
	TO   string
}

type DBConfigOracle struct {
	DbUser string
	DbPass string
	DbHost string
	DbPort int
	DbSid  string
}

type AllDbsConfig struct {
	Oracle   []DBConfigOracle
	Postgres *DbConfigPostgres
}

type DbConfigPostgres struct {
	Password string
	DbName   string
	User     string
	Host     string
}

type Config struct {
	AllDbsConfig       *AllDbsConfig
	Authorization      string
	AuthAlpha          string
	EmailLog           *Email
	Email              *Email
	FTP                *FTP
	Login              *Login
	ParamSigcomIdEmail string
	PortService        int
	Company            string
	DevMode            bool
}

type FTP struct {
	FtpHost string
	FtpPort string
	FtpUser string
	FtpPass string
}

type Login struct {
	User     string `json:"usuario"`
	Password string `json:"senha"`
}
