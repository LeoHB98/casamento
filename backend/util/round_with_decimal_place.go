package util

import "math"

func (u *Util) RoundWithDecimalPlace(num float64, decimalPlace int) float64 {
	factor := math.Pow10(decimalPlace)
	rounded := math.Round(num*factor) / factor
	return rounded
}
