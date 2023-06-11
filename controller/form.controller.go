package controller

import (
	"encoding/json"
	"io"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sreehari2003/kseb/models"
	"gorm.io/gorm"
)

func (h Handler) CreateForm(c *gin.Context) {
	var issues []models.Issue

	// Clear previous errors if any
	errList := map[string]string{}
	var form = models.Form{}
	// Accessing the issue ID from request params
	id := c.Query("id")
	// Next, need to verify whether the issue with this ID exists or not
	if result := h.DB.Find(&issues, id); result.Error != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"status": http.StatusInternalServerError,
			"error":  "couldn't find the issue",
			"ok":     false,
		})
	}
	body, err := io.ReadAll(c.Request.Body)
	// If there's an error in marshaling the body
	if err != nil {
		errList["Invalid_body"] = "invalid data provided"
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"status": http.StatusUnprocessableEntity,
			"error":  errList,
			"ok":     false,
		})
		return
	}

	err = json.Unmarshal(body, &form)
	if err != nil {
		errList["Invalid_body"] = "Invalid data provided"
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"status": http.StatusUnprocessableEntity,
			"error":  errList,
		})
		return
	}
	// Validating the user data based on our schema
	errorMessages := form.Validate()
	if len(errorMessages) > 0 {
		errList = errorMessages
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"status": http.StatusUnprocessableEntity,
			"error":  errList,
			"ok":     false,
		})
		return
	}

	// Creating data in the database
	// If there's an error, send the error to the client
	if err := h.DB.Create(&form).Error; err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"status": http.StatusInternalServerError,
			"error":  "couldn't save your data",
			"ok":     false,
		})
		return
	}
	// Sending success message with data to the client
	c.JSON(http.StatusCreated, gin.H{
		"status":   http.StatusCreated,
		"response": "Form created successfully",
		"ok":       true,
		"data":     form,
	})
}

func (h Handler) GetAllForm(c *gin.Context) {
	// Results will be stored in this variable if the request is successful
	var forms []models.Form
	if result := h.DB.Find(&forms); result.Error != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"status": http.StatusInternalServerError,
			"error":  "couldn't find your data",
			"ok":     false,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status":   http.StatusOK,
		"response": "Data read successfully",
		"ok":       true,
		"data":     forms,
	})
}

func (h Handler) GetFormByID(c *gin.Context) {
	var form models.Form
	id := c.Param("id")
	if result := h.DB.Find(&form, id); result.Error != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"status": http.StatusInternalServerError,
			"error":  "couldn't find the data",
			"ok":     false,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":   http.StatusOK,
		"response": "Data read successfully",
		"ok":       true,
		"data":     form,
	})
}

func (h Handler) ChangeStatusHandler(c *gin.Context) {
	// Get the issue ID from the request URL
	issueID := c.Param("id")

	// Check if the issue entry exists in the database
	var issue models.Issue
	if err := h.DB.First(&issue, issueID).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Issue entry not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch Issue entry"})
		return
	}

	// Get the authenticated official (LineMan)
	official, exists := c.Get("official")
	if !exists {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get authenticated official"})
		return
	}

	// Check if the official is authorized to change the status
	lineman, ok := official.(*models.Officials)
	if !ok || lineman.Role != models.LM {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	// Update the status fields based on the request body
	var updateData struct {
		Working   bool `json:"working"`
		Completed bool `json:"completed"`
	}
	if err := c.ShouldBindJSON(&updateData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	// Update the status fields in the form entry
	var form models.Form
	if err := h.DB.FirstOrCreate(&form, models.Form{IssueID: issue.ID}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update Form entry"})
		return
	}
	form.Working = updateData.Working
	form.Completed = updateData.Completed

	// Save the updated form entry to the database
	if err := h.DB.Save(&form).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update Form entry"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Status updated successfully"})
}
