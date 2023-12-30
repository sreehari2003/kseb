package middlewares

import (
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/sreehari2003/kseb/controller"
	"github.com/sreehari2003/kseb/models"
	"github.com/supertokens/supertokens-golang/supertokens"
)

func Supertokens() gin.HandlerFunc {
	return gin.HandlerFunc(func(c *gin.Context) {
		supertokens.Middleware(http.HandlerFunc(
			func(rw http.ResponseWriter, r *http.Request) {

				c.Next()
			})).ServeHTTP(c.Writer, c.Request)
		// we call Abort so that the next handler in the chain is not called, unless we call Next explicitly
		c.Abort()
	})
}

func Cors() gin.HandlerFunc {
	return cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "https://suraksha.vercel.app"},
		AllowMethods:     []string{"GET", "POST", "DELETE", "PUT", "OPTIONS", "PATCH"},
		AllowHeaders:     append([]string{"content-type"}, supertokens.GetAllCORSHeaders()...),
		MaxAge:           1 * time.Minute,
		AllowCredentials: true,
	})
}

func VerifyUser(h controller.Handler) gin.HandlerFunc {
	return func(c *gin.Context) {

		// Fetching the session object and reading the userID
		// sessionContainer := session.GetSessionFromRequestContext(c.Request.Context())
		// userId := sessionContainer.GetUserID()
		var official models.Officials
		// if result := h.DB.Where("auth_id = ?", userId).First(&official); result.Error != nil {
		// 	c.JSON(http.StatusNotFound, gin.H{
		// 		"status": http.StatusNotFound,
		// 		"error":  "couldn't find the user",
		// 		"ok":     false,
		// 	})
		// 	return
		// }
		// Check if the user is verified
		// if official.IsVerified == false {
		// 	c.JSON(http.StatusForbidden, gin.H{
		// 		"status": http.StatusForbidden,
		// 		"error":  "Unauthoried Person",
		// 		"ok":     false,
		// 	})
		// 	c.Abort()
		// 	return
		// }
		// Pass the user object to the next handler
		c.Set("user", official)
		c.Next()
	}
}
