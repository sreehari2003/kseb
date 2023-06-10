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

func (h Handler) GetAllOfficials(c *gin.Context) {
	// results will be stored in this variable
	// if request is successful
	var Official []models.Officials
	if result := h.DB.Find(&Official); result.Error != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"status": http.StatusInternalServerError,
			"error":  "couldn't save your data",
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

// Get the name of an user by the name
func (h Handler) SearchOfficialByName(c *gin.Context) {
	// Get the search query parameter from the request
	name := c.Query("name")

	var officials []models.Officials
	if result := h.DB.Where("name LIKE ?", "%"+name+"%").Find(&officials); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"status": http.StatusNotFound,
			"error":  "couldn't find the user",
			"ok":     false,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":   http.StatusOK,
		"response": "Users found successfully",
		"ok":       true,
		"data":     officials,
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
	if result := h.DB.Where("auth_id = ?", userId).First(&Official); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"status": http.StatusNotFound,
			"error":  "User not found",
			"ok":     false,
		})
		return
	}

	// Check if the user has any role in the database
	if Official.Role == "" {
		c.JSON(http.StatusForbidden, gin.H{
			"status": http.StatusForbidden,
			"error":  "User does not have any role",
			"ok":     false,
		})
		return
	}

	// Get the role of the user
	role := Official.Role

	// Check if the user's role matches the required role
	requiredRole := "AE" // Replace with the actual required role
	if role != requiredRole {
		c.JSON(http.StatusForbidden, gin.H{
			"status": http.StatusForbidden,
			"error":  "Unauthorized access",
			"ok":     false,
		})
		return
	}

	// Get the user ID from the request parameters
	id := c.Param("id")

	// Find the user by ID
	if result := h.DB.Find(&Official, id); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"status": http.StatusNotFound,
			"error":  "User not found",
			"ok":     false,
		})
		return
	}
	// Update the is_validated field to true
	if result := h.DB.Model(&Official).Update("is_Verifed", true); result.Error != nil {
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
		"data":     Official,
	})
}
