package db

import (
	"fmt"
	"log"
	"math/rand"
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
	generateDummyData(db)

	return db
}

func generateDummyData(db *gorm.DB) error {
	for i := 1; i <= 10; i++ {
		// Create dummy forms for each issu

		form := models.Form{
			ComplaintNumber: fmt.Sprintf("Complaint%d", i),
			JobDescription:  fmt.Sprintf("JobDescription%d", i),
			Disconnection:   fmt.Sprintf("Disconnection%d", i),
			EarthedLocation: fmt.Sprintf("EarthedLocation%d", i),
			ShortedLocation: fmt.Sprintf("ShortedLocation%d", i),
			Location:        fmt.Sprintf("Location%d", i),
			PowerOutage:     fmt.Sprintf("PowerOutage%d", i),
			Feeder:          fmt.Sprintf("Feeder%d", i),
			Section:         fmt.Sprintf("Section%d", i),
			Typeofjob:       fmt.Sprintf("Typeofjob%d", i),
			Voltage:         rand.Intn(100), // Modify as needed
			Ptw:             fmt.Sprintf("Ptw%d", i),
			Substation:      fmt.Sprintf("Substation%d", i),
			Transformer:     fmt.Sprintf("Transformer%d", i),
			Status:          "WAITING",
		}

		// Create dummy issue with associated forms
		issue := models.Issue{
			Title:  fmt.Sprintf("IssueTitle%d", i),
			Desc:   fmt.Sprintf("IssueDesc%d", i),
			PostID: fmt.Sprintf("Post%d", i),
			Form:   form,
		}

		// Save the issue (which creates associated forms due to the foreign key relationship)
		if err := db.Create(&issue).Error; err != nil {
			return err
		}

		fmt.Printf("Created Issue with Forms: %d\n", i)
	}

	return nil
}
