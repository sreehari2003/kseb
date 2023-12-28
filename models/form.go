package models

import (
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
	Issue           Issue      `gorm:"foreignKey:IssueID;references:ID"`
	Status          ROLE       `sql:"type:ENUM('WAITING', 'WORKING', 'COMPLETED')" gorm:"column:status"`
	Admin           uint       `gorm:"not null" json:"official_id"`
	Assignees       []Assignee `json:"assignees"`
}

// Assignee represents the assignees table“
type Assignee struct {
	FormID      string `json:"form_id"`
	OfficialsID string `json:"official_id"`
}
