package controller

import (
	"encoding/json"
	"io"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sreehari2003/kseb/models"
	"github.com/supertokens/supertokens-golang/recipe/passwordless"
	"github.com/supertokens/supertokens-golang/recipe/session"
)

// Create User
// @Summary Create KSEB Employee
// @Param reqBody body models.Officials true "Example Request Body"
// @Accept  json
// @Produce  json
// @Router /officials [post]
func (h Handler) CreateOffical(c *gin.Context) {
	//clear previous error if any
	errList := map[string]string{}
	var officials = models.Officials{}
	body, err := io.ReadAll(c.Request.Body)

	// if error in marsheling body
	if err != nil {
		errList["Invalid_body"] = "invalid data provided"
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"status": http.StatusUnprocessableEntity,
			"error":  errList,
			"ok":     false,
		})
		return
	}

	err = json.Unmarshal(body, &officials)
	if err != nil {
		errList["Invalid_body"] = "Invalid data provided"
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"status": http.StatusUnprocessableEntity,
			"error":  errList,
		})
		return
	}
	// validating the user data based on our schema
	errorMessages := officials.Validate()

	if len(errorMessages) > 0 {
		errList = errorMessages
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"status": http.StatusUnprocessableEntity,
			"error":  errList,
			"ok":     false,
		})
		return
	}

	// Fetching the session object and reading the userID
	sessionContainer := session.GetSessionFromRequestContext(c.Request.Context())
	userId := sessionContainer.GetUserID()
	userInfo, err := passwordless.GetUserByID(userId)
	officials.AuthId = userId
	officials.Phone = *userInfo.PhoneNumber

	// creating data in db
	// if error send error to client
	err = h.DB.Create(&officials).Error
	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"status": http.StatusInternalServerError,
			"error":  "couldn't save your data",
			"ok":     false,
		})
		return
	}
	// sending succes message with data to client
	c.JSON(http.StatusCreated, gin.H{
		"status":   http.StatusCreated,
		"response": "User created successfully",
		"ok":       true,
		"data":     officials,
	})

}

// Get Users
// @Summary return all verified users
// @Accept  json
// @Produce  json
// @Router /officials/all [get]
func (h Handler) GetAllVerifiedOfficials(c *gin.Context) {
	// results will be stored in this variable
	// if request is successful
	var Official []models.Officials
	if result := h.DB.Where("is_verified", true).Find(&Official); result.Error != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"status": http.StatusInternalServerError,
			"error":  "couldn't get data",
			"ok":     false,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status":   http.StatusOK,
		"response": "Data read successfully",
		"ok":       true,
		"data":     Official,
	})
}

// Get Users
// @Summary return all verify pending users
// @Accept  json
// @Produce  json
// @Router /officials/pending [get]
func (h Handler) GetAllPendingOfficials(c *gin.Context) {
	// results will be stored in this variable
	// if request is successful
	var Official []models.Officials
	if result := h.DB.Where("is_verified", false).Find(&Official); result.Error != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"status": http.StatusInternalServerError,
			"error":  "couldn't get data",
			"ok":     false,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status":   http.StatusOK,
		"response": "Data read successfully",
		"ok":       true,
		"data":     Official,
	})
}

// Find User
// @Summary Check whether user exist in database or not by supertokens primary key
// @Accept  json
// @Produce  json
// @Router /officials [get]
func (h Handler) GetOfficial(c *gin.Context) {
	var Officials models.Officials
	// Fetching the session object and reading the userID
	sessionContainer := session.GetSessionFromRequestContext(c.Request.Context())
	userId := sessionContainer.GetUserID()
	if result := h.DB.Where("auth_id = ?", userId).First(&Officials); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"status": http.StatusNotFound,
			"error":  "couldn't find the user",
			"ok":     false,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":   http.StatusOK,
		"response": "Data read successfully",
		"ok":       true,
		"data":     Officials,
	})
}

// Get the name of Line man
func (h Handler) SearchLinemanByName(c *gin.Context) {
	// Get the search query parameter from the request
	name := c.Query("name")

	var linemen []models.Officials
	if result := h.DB.Where("name LIKE ? AND role = ?", "%"+name+"%", models.LM).Find(&linemen); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"status": http.StatusNotFound,
			"error":  "couldn't find the lineman",
			"ok":     false,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":   http.StatusOK,
		"response": "Linemen found successfully",
		"ok":       true,
		"data":     linemen,
	})
}

// Fetch the forms associated with an particular Employee
func (h Handler) GetFormsByOfficialID(c *gin.Context) {
	officialID := c.Param("id")

	var forms []models.Form
	if result := h.DB.Where("official_id = ?", officialID).Find(&forms); result.Error != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"status": http.StatusInternalServerError,
			"error":  "couldn't find the data",
			"ok":     false,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":   http.StatusOK,
		"response": "Forms fetched successfully",
		"ok":       true,
		"data":     forms,
	})
}

func (h Handler) VerifyUser(c *gin.Context) {
	// Fetch the session object and read the userID
	sessionContainer := session.GetSessionFromRequestContext(c.Request.Context())
	userId := sessionContainer.GetUserID()

	// Find the user by auth_id
	var Official models.Officials
	var User models.Officials
	if result := h.DB.Where("auth_id = ?", userId).First(&Official); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"status": http.StatusNotFound,
			"error":  "User not found",
			"ok":     false,
		})
		return
	}

	// Get the role of the user

	// Check if the user's role matches the required role
	if Official.Role != "OV" || !Official.IsVerified {
		c.JSON(http.StatusForbidden, gin.H{
			"status": http.StatusForbidden,
			"error":  "Unauthorized access",
			"ok":     false,
		})
		return
	}

	// Get the user ID from the request parameters
	ID := c.Param("id")

	// Find the user by ID
	if result := h.DB.Find(&User, ID); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"status": http.StatusNotFound,
			"error":  "User not found",
			"ok":     false,
		})
		return
	}
	// Update the is_validated field to true
	if result := h.DB.Model(&User).Update("is_verified", true); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status": http.StatusInternalServerError,
			"error":  "Failed to verify user",
			"ok":     false,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status":   http.StatusOK,
		"response": "User verified successfully",
		"ok":       true,
		"data":     User,
	})
}
