package models

import (
	"errors"

	"github.com/uptrace/bun"
)

// swagger:model Issue
type Issue struct {
	bun.BaseModel `bun:"table:issue,alias:u"`
	ID            int64  `bun:"id,pk,autoincrement"`
	Title         string `bun:"title,notnull"`
	Desc          string `bun:"desc,notnull"`
	PostID        string `bun:"post_id,notnull"`
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
