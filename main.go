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

func main() {

	err := godotenv.Load()
	auth.Init()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	PORT := os.Getenv("PORT")

	// initialising an instance of postgres db
	db := db.Init()
	// using dependency injection to pass instance
	// of db to contoller functions
	h := controller.New(db)
	router := router.CreateRoute(h)

	// CORS

	router.Run("localhost:" + PORT)
	// use ginSwagger middleware to serve the API docs
}
