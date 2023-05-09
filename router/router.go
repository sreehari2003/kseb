package router

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sreehari2003/kseb/controller"
	"github.com/sreehari2003/kseb/middlewares"
)

func CreateRoute(h controller.Handler) *gin.Engine {

	router := gin.Default()
	// cors handling middlewares and supertokens middlewares
	router.Use(middlewares.Cors())

	router.Use(middlewares.Supertokens())

	// use ginSwagger middleware to serve the API docs
	router.GET("/", func(c *gin.Context) {
		res := map[string]interface{}{
			"data": "Server is up and running",
			"ok":   true,
		}
		c.JSON(http.StatusOK, res)
	})

	v1 := router.Group("/api/v1")
	// accesing controller by method
	v1.POST("/issue", h.CreateIssue)
	v1.GET("/issue", h.GetAllIssues)
	v1.GET("/issue/delete", h.DeleteAllIssue)
	v1.GET("/issue/:id", h.GetIssueByID)
	//v1.GET("/issue/search", h.SearchIssueByTitle)
	v1.GET("/issue/search", h.SearchIssueByPostNumber)
	// v1.g

	// accesing controller by method
	v1.POST("/officials", h.CreateOffical)
	v1.GET("/officials", h.GetAllOfficials)
	v1.GET("/officials/:id", h.GetOfficialsByID)

	// accesing controller by method
	v1.POST("/form", h.CreateForm)
	v1.GET("/form", h.GetAllForm)
	v1.GET("/form/:id", h.GetFormByID)

	return router
}
