package main

import (
	"kseb/auth"
	"kseb/middlewares"
	"kseb/router"
	"log"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	PORT := os.Getenv("PORT")
	auth.Init()
	router := router.CreateRoute()
	middlewares.Register(router)
	router.Run("localhost:" + PORT)
}
