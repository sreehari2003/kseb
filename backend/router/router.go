package router

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func CreateRoute() *gin.Engine {
	router := gin.Default()
	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"ok":      true,
			"message": "api is running on port 8080 succesfully",
		})
	})
	return router
}
