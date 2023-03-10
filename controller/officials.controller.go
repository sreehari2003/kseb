package controller

import (
	"encoding/json"
	"io"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sreehari2003/kseb/models"
)

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
		"response": "Issue created successfully",
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
	c.JSON(http.StatusCreated, gin.H{
		"status":   http.StatusCreated,
		"response": "Data read successfully",
		"ok":       true,
		"data":     Official,
	})
}

func (h Handler) GetOfficialsByID(c *gin.Context) {
	var Officials []models.Officials
	id := c.Param("id")
	if result := h.DB.Find(&Officials, id); result.Error != nil {
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
		"data":     Officials,
	})
}
