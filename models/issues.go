package models

import (
	"errors"

	"gorm.io/gorm"
)

type Issue struct {
	gorm.Model
	Id      uint   `gorm:"primary_key;auto_increment" json:"id"`
	Title   string `gorm:"size:255;not null" json:"title"`
	Desc    string `gorm:"size:255;not null" json:"desc"`
	PostID  string `gorm:"not null" json:"post_id"`
	Form    Form   `gorm:"foreignkey:IssueID"`
	IssueID uint
}

// custom vaidation for body data from backend
// we might migrate to validation libraries later
func (i *Issue) Validate() map[string]string {
	var err error
	var errormessage = make(map[string]string)
	if i.Title == "" {
		err = errors.New("Required title")
		errormessage["Required_title"] = err.Error()
	}
	if i.Desc == "" {
		err = errors.New("Required description")
		errormessage["Required_description"] = err.Error()
	}
	if i.PostID == "" {
		err = errors.New("Required postid")
		errormessage["Required_postid"] = err.Error()
	}
	return errormessage
}

// func GetIssueWithForm(db *gorm.DB, issueID uint) (*Issue, error) {
// 	var issue Issue
// 	if err := db.Preload("Form").First(&issue, issueID).Error; err != nil {
// 		return nil, err
// 	}
// 	return &issue, nil
// }
