package main

import (
	"kseb/auth"
	"kseb/middlewares"
	"kseb/router"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {

	auth.Init()
	router := router.CreateRoute()
	middlewares.Register(router)
	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "api is running on port 8080 succesfully",
		})
	})
	router.Run("localhost:8080")
}
