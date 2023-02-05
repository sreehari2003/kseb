package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/sreehari2003/kseb/auth"
	"github.com/sreehari2003/kseb/docs"
	"github.com/sreehari2003/kseb/middlewares"
	"github.com/sreehari2003/kseb/router"

	swaggerFiles "github.com/swaggo/files"

	ginSwagger "github.com/swaggo/gin-swagger"
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
	// cors handling middlewares and supertokens middlewares
	router.Use(middlewares.Cors())
	router.Use(middlewares.Supertokens())

	router.Run("localhost:" + PORT)
	// use ginSwagger middleware to serve the API docs
}
