package models

import (
	"gorm.io/gorm"
)

type IsDone struct {
	gorm.Model
	Id        uint        `gorm:"primary_key;auto_increment" json:"id"`
	Approved  bool        `gorm:"default:false" json:"approved"`
	Working   bool        `gorm:"default:false" json:"working"`
	Completed bool        `gorm:"default:false" json:"completed"`
	Officials []Officials `gorm:"foreignkey:OfficialID"`
	IssueID   uint        `gorm:"not null" json:"issue_id"`
	Issue     Issue       `gorm:"foreignKey:IssueID"`
}

func (i *IsDone) Validate() map[string]string {
	var errormessage = make(map[string]string)
	return errormessage
}
