package models

import (
	"errors"

	"gorm.io/gorm"
)

const (
	Waiting   ROLE = "WAITING"
	Working   ROLE = "WORKING"
	Completed ROLE = "COMPLETED"
)

// swagger:model Form
type Form struct {
	gorm.Model
	ComplaintNumber string      `gorm:"size:255;not null" json:"complaintNumber"`
	JobDescription  string      `gorm:"not null" json:"description"`
	Disconnection   string      `gorm:"not null" json:"disconnectionPlace"`
	EarthedLocation string      `gorm:"not null" json:"earthedLocations"`
	ShortedLocation string      `gorm:"not null" json:"shortedLocation"`
	Location        string      `gorm:"not null" json:"location"`
	Feeder          string      `gorm:"not null" json:"feeder"`
	Section         string      `gorm:"size:255;not null" json:"section"`
	Typeofjob       string      `gorm:"size:255;not null" json:"typeofjob"`
	Voltage         int         `gorm:"not null" json:"voltage"`
	Ptw             string      `gorm:"not null" json:"ptwAllowed"`
	Substation      string      `gorm:"not null" json:"substation"`
	Transformer     string      `gorm:"not null" json:"transformer"`
	Status          ROLE        `sql:"type:ENUM('WAITING', 'WORKING', 'COMPLETED')" gorm:"column:status"`
	IssueID         uint        `gorm:"not null" json:"issue_id"`
	Issue           Issue       `gorm:"foreignKey:IssueID"`
	OfficialsID     uint        `gorm:"not null" json:"official_id"`
	Officials       Officials   `gorm:"foreignKey:OfficialsID"`
	Assignee        []Officials `gorm:"many2many:assignees;"`
}

// Assignee represents the assignees table
type Assignee struct {
	gorm.Model
	FormID      uint      `gorm:"form_id"`
	OfficialsID uint      `gorm:"official_id"`
	Form        Form      `gorm:"foreignKey:FormID"`
	Official    Officials `gorm:"foreignKey:OfficialsID"`
}

// custom vaidation for body data from backend
// we might migrate to validation libraries later
func (i *Form) Validate() map[string]string {
	var err error

	var checkVoltage *int
	checkVoltage = &i.Voltage

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
	if i.JobDescription == "" {
		err = errors.New("Required JobDescription")
		errormessage["Required_JobDescription"] = err.Error()
	}

	return errormessage
}
