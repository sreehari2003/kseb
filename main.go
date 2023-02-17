package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/sreehari2003/kseb/auth"
	"github.com/sreehari2003/kseb/middlewares"
	"github.com/sreehari2003/kseb/router"
)

func main() {

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	PORT := os.Getenv("PORT")
	auth.Init()

	router := router.CreateRoute()

	// cors handling middlewares and supertokens middlewares
	router.Use(middlewares.Cors())
	router.Use(middlewares.Supertokens())

	router.Run("localhost:" + PORT)
	// use ginSwagger middleware to serve the API docs
}
