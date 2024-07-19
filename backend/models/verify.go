package models

type Verify struct {
	TableName          string
	MainColumnDatabase string
	Value              interface{}
	Op                 string
	Exists             bool
	Checked            bool
}
