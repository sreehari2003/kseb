package models

import (
	"errors"
)

type ROLE string

const (
	// AE - Assistant Engineer
	AE ROLE = "AE"
	// SE - sub engineer
	SE ROLE = "SE"
	//OV - overseer
	OV ROLE = "OV"
)

type Officials struct {
	Id    uint   `gorm:"primary_key;auto_increment" json:"id"`
	Name  string `gorm:"size:255;not null" json:"name"`
	Role  ROLE   `sql:"type:ENUM('SE', 'AE', 'OV')" gorm:"column:role"`
	Phone int    `gorm:"not null" json:"phone"`
}

// custom vaidation for body data from backend
// we might migrate to validation libraries later
func (i *Officials) Validate() map[string]string {
	var err error
	// used this to validate the phon number is null or not
	var checkNum *int
	checkNum = &i.Phone
	var errormessage = make(map[string]string)
	if i.Name == "" {
		err = errors.New("Required Name")
		errormessage["Required_Name"] = err.Error()
	}
	if i.Role == "" {
		err = errors.New("Required Role")
		errormessage["Required_Role"] = err.Error()
	}
	if checkNum == nil {
		err = errors.New("Required phone")
		errormessage["Required_phone"] = err.Error()
	}
	return errormessage
}
