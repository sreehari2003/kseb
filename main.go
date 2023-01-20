package main

import (
	"kseb/router"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := router.CreateRoute()

	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "api is running on port 8080 succesfully",
		})
	})
	router.Run("localhost:8080")
}
