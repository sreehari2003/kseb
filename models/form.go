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
	ComplaintNumber string     `gorm:"size:255;not null" json:"complaintNumber"`
	JobDescription  string     `gorm:"not null" json:"description"`
	Disconnection   string     `gorm:"not null" json:"disconnectionPlace"`
	EarthedLocation string     `gorm:"not null" json:"earthedLocations"`
	ShortedLocation string     `gorm:"not null" json:"shortedLocation"`
	Location        string     `gorm:"not null" json:"location"`
	PowerOutage     string     `gorm:"not null" json:"powerOutage"`
	Feeder          string     `gorm:"not null" json:"feeder"`
	Section         string     `gorm:"size:255;not null" json:"section"`
	Typeofjob       string     `gorm:"size:255;not null" json:"typeofjob"`
	Voltage         int        `gorm:"not null" json:"voltage"`
	Ptw             string     `gorm:"not null" json:"ptwAllowed"`
	Substation      string     `gorm:"not null" json:"substation"`
	Transformer     string     `gorm:"not null" json:"transformer"`
	IssueID         uint       `gorm:"not null" json:"issue_id"`
	Status          ROLE       `sql:"type:ENUM('WAITING', 'WORKING', 'COMPLETED')" gorm:"column:status"`
	Admin           uint       `gorm:"not null" json:"official_id"`
	Assignees       []Assignee `json:"assignees"`
}

// Assignee represents the assignees table“
type Assignee struct {
	FormID      string `json:"form_id"`
	OfficialsID string `json:"official_id"`
}

// custom vaidation for body data from backend
// we might migrate to validation libraries later
func (i *Form) Validate() map[string]string {
	var err error

	var checkVoltage *int
	checkVoltage = &i.Voltage

	var errormessage = make(map[string]string)

	if i.Section == "" {
		err = errors.New("required Section")
		errormessage["Required_Section"] = err.Error()
	}
	if i.Typeofjob == "" {
		err = errors.New("required Type of job")
		errormessage["Required_Role"] = err.Error()
	}
	if checkVoltage == nil {
		err = errors.New("required phone")
		errormessage["Required_Typeofjob"] = err.Error()
	}
	if i.Location == "" {
		err = errors.New("required Location")
		errormessage["Required_Location"] = err.Error()
	}
	if i.Feeder == "" {
		err = errors.New("required Feeder")
		errormessage["Required_Feeder"] = err.Error()
	}
	if i.Substation == "" {
		err = errors.New("required Substation")
		errormessage["Required_Substation"] = err.Error()
	}
	if i.Transformer == "" {
		err = errors.New("required Transformer")
		errormessage["Required_Transformer"] = err.Error()
	}
	if i.JobDescription == "" {
		err = errors.New("required JobDescription")
		errormessage["Required_JobDescription"] = err.Error()
	}

	return errormessage
}
