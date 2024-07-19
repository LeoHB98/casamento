package util

import (
	"context"
	"time"
)

func (u *Util) CreateTX() {
	ctx := context.Background()
	ctx, canc := context.WithTimeout(ctx, 30*time.Second)
	defer canc()

	var err error
	u.TX, err = u.DB[0].BeginTx(ctx, nil)
	if err != nil {
		return
	}
	defer func() {
		u.TX.Rollback()
		u.TX = nil
	}()
}
