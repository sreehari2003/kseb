package models

type Issue struct {
	Id     uint   `json:"id" gorm:"primary_key"`
	Title  string `json:"title"`
	Desc   string `json:"desc"`
	PostID string `json:"post_id"`
}
