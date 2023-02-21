package db

import (
	"fmt"
	"log"
	"os"

	"github.com/sreehari2003/kseb/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func Init() *gorm.DB {
	pass := os.Getenv("DB_PASSWORD")
	db_user := os.Getenv("DB_USER")
	db_name := os.Getenv("DB_NAME")
	dbURL := "postgresql://" + db_user + ":" + pass + "@localhost:5432/" + db_name
	db, err := gorm.Open(postgres.Open(dbURL), &gorm.Config{})

	if err != nil {
		log.Fatalln(err)
	}
	// if db connection fails this wont run
	fmt.Println("server connected with db successfully")
	db.AutoMigrate(&models.Issue{})

	return db
}
