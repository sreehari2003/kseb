package models

import "gorm.io/gorm"

type Form struct {
	gorm.Model
	Id        uint   `gorm:"primary_key;auto_increment" json:"id"`
	Section   string `gorm:"size:255;not null" json:"section"`
	Typeofjob string `gorm:"size:255;not null" json:"typeofjob"`
	Voltage   int    `gorm:"not null" json:"voltage"`
	Location  string `gorm:"not null" json:"location"`
}
