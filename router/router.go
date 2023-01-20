package router

import (
	"github.com/gin-gonic/gin"
)

func CreateRoute() *gin.Engine {
	router := gin.Default()
	return router
}
