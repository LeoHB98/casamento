package util

import (
	"github.com/alpha_main/models"
)

func (d *Util) InOrUp(values []string, verify models.Verify) string {

	if !verify.Exists {
		return d.BuildInsertQuery(values, verify.TableName)
	} else {
		return d.BuildUpdateQuery(values, verify)
	}
}
