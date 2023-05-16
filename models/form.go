package models

import (
	"errors"

	"gorm.io/gorm"
)

// swagger:model Form
type Form struct {
	gorm.Model
	Id             uint   `gorm:"primary_key;auto_increment" json:"id"`
	Section        string `gorm:"size:255;not null" json:"section"`
	Typeofjob      string `gorm:"size:255;not null" json:"typeofjob"`
	Voltage        int    `gorm:"not null" json:"voltage"`
	Location       string `gorm:"not null" json:"location"`
	Feeder         string `gorm:"not null" json:"feeder"`
	Substation     string `gorm:"not null" json:"substation"`
	Transformer    string `gorm:"not null" json:"transformer"`
	PostNO         string `gorm:"not null" json:"postno"`
	ConsumerNO     int    `gorm:"not null" json:"consumerno"`
	JobDescription string `gorm:"not null" json:"jobdescription"`
	Nooflabours    int    `gorm:"not null" json:"nooflabours"`
	IssueID        uint   `gorm:"uniqueIndex"`
	OfficialID     uint   `gorm:"uniqueIndex"`
}

// custom vaidation for body data from backend
// we might migrate to validation libraries later
func (i *Form) Validate() map[string]string {
	var err error

	var checkVoltage *int
	checkVoltage = &i.Voltage

	var checkConsumerNO *int
	checkConsumerNO = &i.ConsumerNO

	var checkNooflabours *int
	checkNooflabours = &i.Nooflabours

	var errormessage = make(map[string]string)

	if i.Section == "" {
		err = errors.New("Required Section")
		errormessage["Required_Section"] = err.Error()
	}
	if i.Typeofjob == "" {
		err = errors.New("Required Type of job")
		errormessage["Required_Role"] = err.Error()
	}
	if checkVoltage == nil {
		err = errors.New("Required phone")
		errormessage["Required_Typeofjob"] = err.Error()
	}
	if i.Location == "" {
		err = errors.New("Required Location")
		errormessage["Required_Location"] = err.Error()
	}
	if i.Feeder == "" {
		err = errors.New("Required Feeder")
		errormessage["Required_Feeder"] = err.Error()
	}
	if i.Substation == "" {
		err = errors.New("Required Substation")
		errormessage["Required_Substation"] = err.Error()
	}
	if i.Transformer == "" {
		err = errors.New("Required Transformer")
		errormessage["Required_Transformer"] = err.Error()
	}
	if i.PostNO == "" {
		err = errors.New("Required PostNO")
		errormessage["Required_PostNO"] = err.Error()
	}

	if checkConsumerNO == nil {
		err = errors.New("Required ConsumerNO")
		errormessage["Required_ConsumerNO"] = err.Error()
	}
	if i.JobDescription == "" {
		err = errors.New("Required JobDescription")
		errormessage["Required_JobDescription"] = err.Error()
	}
	if checkNooflabours == nil {
		err = errors.New("Required No_of_labours")
		errormessage["Required_No_of_labours"] = err.Error()
	}

	return errormessage
}
