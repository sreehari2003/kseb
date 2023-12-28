package models

import (
	"errors"

	"gorm.io/gorm"
)

// swagger:model Issue
type Issue struct {
	gorm.Model
	Title  string `gorm:"size:255;not null" json:"title"`
	Desc   string `gorm:"size:255;not null" json:"desc"`
	PostID string `gorm:"not null" json:"post_id"`
	Form   Form   `gorm:"foreignKey:IssueID" json:"-"`
}

// custom vaidation for body data from backend
// we might migrate to validation libraries later
func (i *Issue) Validate() map[string]string {
	var err error
	var errormessage = make(map[string]string)
	if i.Title == "" {
		err = errors.New("required title")
		errormessage["equired_title"] = err.Error()
	}
	if i.Desc == "" {
		err = errors.New("required description")
		errormessage["required_description"] = err.Error()
	}
	if i.PostID == "" {
		err = errors.New("required postid")
		errormessage["Required_postid"] = err.Error()
	}
	return errormessage
}
