package models

import (
	"errors"

	"gorm.io/gorm"
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

// swagger:model Officials
type Officials struct {
	gorm.Model
	Id         uint   `gorm:"primary_key;auto_increment" json:"id"`
	AuthId     string `gorm:"unique" json:"auth_id"`
	Name       string `gorm:"size:255;not null" json:"name"`
	Role       ROLE   `sql:"type:ENUM('SE', 'AE', 'OV')" gorm:"column:role"`
	Phone      string `gorm:"not null" json:"phone"`
	Forms      []Form `gorm:"foreignkey:OfficialID"`
	IsVerified bool   `gorm:"default:false" json:"is_verified"`
	Location   string `gorm:"not null" json:"location"`
}

// custom vaidation for body data from backend
// we might migrate to validation libraries later
func (i *Officials) Validate() map[string]string {
	var err error
	// used this to validate the phon number is null or not

	var errormessage = make(map[string]string)
	if i.Name == "" {
		err = errors.New("Required Name")
		errormessage["Required_Name"] = err.Error()
	}
	if i.Role == "" {
		err = errors.New("Required Role")
		errormessage["Required_Role"] = err.Error()
	}
	return errormessage
}
