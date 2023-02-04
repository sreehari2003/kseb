package main

import (
	"kseb/auth"
	"kseb/docs"
	"kseb/middlewares"
	"kseb/router"
	"log"
	"os"

	swaggerFiles "github.com/swaggo/files"

	ginSwagger "github.com/swaggo/gin-swagger"

	"github.com/joho/godotenv"
)

func main() {

	docs.SwaggerInfo.Title = "KSEB"
	docs.SwaggerInfo.Description = "KSEB app development"
	docs.SwaggerInfo.Version = "1.0"
	docs.SwaggerInfo.Host = "petstore.swagger.io"
	docs.SwaggerInfo.BasePath = "/"
	docs.SwaggerInfo.Schemes = []string{"http", "https"}

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	PORT := os.Getenv("PORT")
	auth.Init()

	router := router.CreateRoute()
	// use ginSwagger middleware to serve the API docs
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	middlewares.Register(router)
	router.Run("localhost:" + PORT)
	// use ginSwagger middleware to serve the API docs
}
