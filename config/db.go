package config

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func Connect() {
	db, err := gorm.Open(postgres.Open("postgres://postgres:postgres@localhost:5432/postgres"), &gorm.Config{})
	if err != nil {
		panic(err)
	}
	db.AutoMigrate()

}
