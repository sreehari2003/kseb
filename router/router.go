package router

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sreehari2003/kseb/controller"
	"github.com/sreehari2003/kseb/docs"
	"github.com/sreehari2003/kseb/middlewares"

	swaggerFiles "github.com/swaggo/files"

	ginSwagger "github.com/swaggo/gin-swagger"
)

func CreateRoute(h controller.Handler) *gin.Engine {
	docs.SwaggerInfo.Title = "KSEB"
	docs.SwaggerInfo.Description = "KSEB app development"
	docs.SwaggerInfo.Version = "1.0"
	docs.SwaggerInfo.Host = "petstore.swagger.io"
	docs.SwaggerInfo.BasePath = "/"
	docs.SwaggerInfo.Schemes = []string{"http", "https"}

	router := gin.Default()
	// cors handling middlewares and supertokens middlewares
	router.Use(middlewares.Cors())

	router.Use(middlewares.Supertokens())
	router.Use(gin.Recovery())

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
	v1.GET("/issue/:id", h.GetIssueByID)
	// v1.g

	// accesing controller by method
	v1.POST("/officials", h.CreateOffical)
	v1.GET("/officials", h.GetAllOfficials)
	v1.GET("/officials/:id", h.GetOfficialsByID)

	// accesing controller by method
	v1.POST("/form", h.CreateForm)
	v1.GET("/form", h.GetAllForm)
	v1.GET("/form/:id", h.GetFormByID)

	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	return router
}
