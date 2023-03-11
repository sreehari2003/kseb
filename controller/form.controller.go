package controller

import (
	"encoding/json"
	"io"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sreehari2003/kseb/models"
)

func (h Handler) CreateForm(c *gin.Context) {
	//clear previous error if any
	errList := map[string]string{}
	var form = models.Form{}
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

	err = json.Unmarshal(body, &form)
	if err != nil {
		errList["Invalid_body"] = "Invalid data provided"
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"status": http.StatusUnprocessableEntity,
			"error":  errList,
		})
		return
	}
	// validating the user data based on our schema
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

	// creating data in db
	// if error send error to client
	err = h.DB.Create(&form).Error
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
		"response": "Form created successfully",
		"ok":       true,
		"data":     form,
	})

}

func (h Handler) GetAllForm(c *gin.Context) {
	// results will be stored in this variable
	// if request is successful
	var Form []models.Form
	if result := h.DB.Find(&Form); result.Error != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"status": http.StatusInternalServerError,
			"error":  "couldn't find your data",
			"ok":     false,
		})
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"status":   http.StatusCreated,
		"response": "Data read successfully",
		"ok":       true,
		"data":     Form,
	})
}

func (h Handler) GetFormByID(c *gin.Context) {
	var Form []models.Form
	id := c.Param("id")
	if result := h.DB.Find(&Form, id); result.Error != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"status": http.StatusInternalServerError,
			"error":  "couldn't find the data",
			"ok":     false,
		})
	}

	c.JSON(http.StatusCreated, gin.H{
		"status":   http.StatusCreated,
		"response": "Data read successfully",
		"ok":       true,
		"data":     Form,
	})
}
