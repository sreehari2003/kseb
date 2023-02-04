package main

import (
	"kseb/auth"
	"kseb/middlewares"
	"kseb/router"
	"log"
	"os"

	"github.com/joho/godotenv"
	// @title KSEB API
	// @version 1.0
	// @description This is the KSEB API
	// @termsOfService http://kseb.com/terms/
	// @contact.name KSEB Support
	// @contact.url http://kseb.com/support
	// @contact.email support@kseb.com
	// @license.name Apache 2.0
	// @license.url http://www.apache.org/licenses/LICENSE-2.0.html
	// @host kseb.com
	// @BasePath /api/v1
	// @securityDefinitions.basic BasicAuth
	// @securityDefinitions.apikey ApiKeyAuth
	// @in header
	// @name Authorization
	// @securitydefinitions.oauth2.application OAuth2Application
	// @tokenUrl https://kseb.com/oauth/token
	// @flow implicit
	// @authorizationUrl https://kseb.com/oauth/authorize
	// @securitydefinitions.oauth2.implicit OAuth2Implicit
	// @authorizationUrl https://kseb.com/oauth/authorize
	// @flow implicit
	// @securitydefinitions.oauth2.password OAuth2Password
	// @tokenUrl https://kseb.com/oauth/token
	// @flow password
	// @securitydefinitions.oauth2.accessCode OAuth2AccessCode
	// @tokenUrl https://kseb.com/oauth/token
	// @authorizationUrl https://kseb.com/oauth/authorize
	// @flow accessCode
)

// @title Main function
// @desc This function initializes the API and starts the server.
// @route /
// @method GET
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
