package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/sreehari2003/kseb/auth"
	"github.com/sreehari2003/kseb/controller"
	"github.com/sreehari2003/kseb/db"
	"github.com/sreehari2003/kseb/middlewares"
	"github.com/sreehari2003/kseb/router"
)

func main() {

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	PORT := os.Getenv("PORT")
	// initialising an instance of postgres db
	db := db.Init()
	// using dependency injection to pass instance
	// of db to contoller functions
	h := controller.New(db)
	auth.Init()

	router := router.CreateRoute(h)

	// cors handling middlewares and supertokens middlewares
	router.Use(middlewares.Cors())
	router.Use(middlewares.Supertokens())

	router.Run("localhost:" + PORT)
	// use ginSwagger middleware to serve the API docs
}
