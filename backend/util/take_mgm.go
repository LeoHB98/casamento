package util

import (
	"fmt"

	"github.com/alpha_main/messages"
)

func (u *Util) TakeMgm(verifyExists bool, fieldWorked string) string {

	if !verifyExists {
		return fmt.Sprintf(messages.MGM_INSERTED, fieldWorked)
	} else {
		return fmt.Sprintf(messages.MGM_UPDATED, fieldWorked)
	}

}
