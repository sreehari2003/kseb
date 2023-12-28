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
	db_port_host := os.Getenv("DB_PORT_HOST")
	dbURL := "postgresql://" + db_user + ":" + pass + db_port_host + "/" + db_name
	fmt.Println(dbURL)
	db, err := gorm.Open(postgres.Open(dbURL), &gorm.Config{
		DisableForeignKeyConstraintWhenMigrating: true,
	})

	if err != nil {
		fmt.Println(dbURL)
		log.Fatalln(err)
	}

	// if db connection fails this wont run
	fmt.Println("server connected with db successfully")

	db.AutoMigrate(&models.Issue{})
	db.AutoMigrate(&models.Form{})
	db.AutoMigrate(&models.Officials{})

	return db
}
