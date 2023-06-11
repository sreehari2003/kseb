package router

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sreehari2003/kseb/controller"
	"github.com/sreehari2003/kseb/docs"
	"github.com/sreehari2003/kseb/middlewares"
	"github.com/supertokens/supertokens-golang/recipe/session"
	"github.com/supertokens/supertokens-golang/recipe/session/sessmodels"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// Wrap session.VerifySession to work with Gin
func verifySession(options *sessmodels.VerifySessionOptions) gin.HandlerFunc {
	return func(c *gin.Context) {
		session.VerifySession(options, func(rw http.ResponseWriter, r *http.Request) {
			c.Request = c.Request.WithContext(r.Context())
			c.Next()
		})(c.Writer, c.Request)
		// we call Abort so that the next handler in the chain is not called, unless we call Next explicitly
		c.Abort()
	}
}

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
	docs.SwaggerInfo.BasePath = "/api/v1"
	v1 := router.Group("/api/v1")
	// accesing controller by method

	// @BasePath /api/v1

	v1.POST("/issue", h.CreateIssue)
	v1.GET("/issue", h.GetAllIssues)
	v1.DELETE("/issue", verifySession(nil), h.DeleteAllIssue)
	v1.GET("/issue/:id", h.GetIssueByID)
	v1.GET("/issue/search", h.SearchIssueByPostNumber)
	// v1.g

	// accesing controller by method

	v1.POST("/officials", verifySession(nil), h.CreateOffical)
	v1.GET("/officials", verifySession(nil), h.GetOfficial)
	v1.GET("/officials/:id/forms", verifySession(nil), h.GetFormsByOfficialID)
	v1.GET("/officials/search", verifySession(nil), h.SearchOfficialByName)
	v1.GET("/officials/all", verifySession(nil), h.GetAllOfficials)
	// middleware make sure that only a verfied user can veryfy another user
	v1.PATCH("/officials/verify", verifySession(nil), middlewares.VerifyUser(h), h.VerifyUser)

	// accesing controller by method
	v1.POST("/form", verifySession(nil), h.CreateForm)
	v1.GET("/form", verifySession(nil), h.GetAllForm)
	v1.GET("/form/:id", verifySession(nil), h.GetFormByID)
	v1.PUT("/forms/status", verifySession(nil), h.ChangeStatusHandler)

	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))

	return router
}
