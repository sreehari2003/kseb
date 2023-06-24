package controller

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sreehari2003/kseb/models"
)

func (h Handler) CreateForm(c *gin.Context) {
	var form models.Form
	var issues models.Issue

	// Clear previous errors if any
	errList := map[string]string{}
	// Accessing the issue ID from request params
	ID := c.Query("id")
	// Next, need to verify whether the issue with this ID exists or not
	if result := h.DB.Find(&issues, ID); result.Error != nil {
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
		fmt.Println(err)
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"status": http.StatusUnprocessableEntity,
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
	ID := c.Param("id")
	if result := h.DB.Find(&form, ID).Preload("Asignees"); result.Error != nil {
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

func (h Handler) CompleteIssue(c *gin.Context) {
	// Get the issue ID from the request URL
	ID := c.Param("id")
	var Form = models.Form{}
	if result := h.DB.Find(&Form, ID); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"status": http.StatusNotFound,
			"error":  "User not found",
			"ok":     false,
		})
		return
	}
	if result := h.DB.Model(&Form).Update("status", "COMPLETED"); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status": http.StatusInternalServerError,
			"error":  "Failed to update form",
			"ok":     false,
		})

	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Status updated successfully",
		"ok":      true,
		"data":    Form,
	})
}
