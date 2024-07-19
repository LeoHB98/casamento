package util

import (
	"fmt"

	"github.com/alpha_main/messages"
	"github.com/alpha_main/models"
)

func (u *Util) GetId(verify models.Verify) (int64, error) {

	exists, err := u.VerifyExistence(verify)
	if err != nil {
		mgm := fmt.Sprintf(messages.ERROR_VERIFY_ROW_TABLE, verify.TableName)
		return 0, fmt.Errorf("%v-%v", mgm, err)
	}

	if exists {
		id, err := u.SearchValue("id", verify.TableName, verify.MainColumnDatabase, verify.Value)
		if err != nil {
			mgm := fmt.Sprintf(messages.ERROR_SEARCHVALUE, verify.MainColumnDatabase)
			return 0, fmt.Errorf("%v-%v", mgm, err)
		} else {
			if nid, ok := id.(int64); ok {
				return nid, nil
			}
		}
	} else {
		return 0, nil
	}

	return 0, nil

}
