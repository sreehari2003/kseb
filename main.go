package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/sreehari2003/kseb/auth"
	"github.com/sreehari2003/kseb/controller"
	"github.com/sreehari2003/kseb/db"
	"github.com/sreehari2003/kseb/router"
)

// @title KSEB Web Server
// @version 1.0
// @description Provide Info About KSEB Web Server].
// @termsOfService http://swagger.io/terms/

// @contact.name API Support
// @contact.url http://www.swagger.io/support
// @contact.email support@swagger.io

// @license.name MIT
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html

// @host localhost:8000
// @BasePath /api/v1
// @schemes http

func main() {

	if _, exists := os.LookupEnv("RAILWAY_ENVIRONMENT"); !exists {
		if err := godotenv.Load(); err != nil {
			log.Fatal("error loading .env file:", err)
		}
	}

	auth.Init()

	PORT := os.Getenv("PORT")

	host := "localhost"

	env := os.Getenv("ENV")

	if env != "DEVELOPMENT" {
		host = "0.0.0.0"
	}

	// initialising an instance of postgres db
	db := db.Init()
	// using dependency injection to pass instance
	// of db to contoller functions
	h := controller.New(db)
	router := router.CreateRoute(h)

	// CORS

	router.Run(host + ":" + PORT)
	// use ginSwagger middleware to serve the API docs
}
