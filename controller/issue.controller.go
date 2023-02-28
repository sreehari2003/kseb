package controller

import (
	"encoding/json"
	"io"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sreehari2003/kseb/models"
	"gorm.io/gorm"
)

type Handler struct {
	DB *gorm.DB
}

func New(db *gorm.DB) Handler {
	return Handler{db}
}

func (h Handler) CreateIssue(c *gin.Context) {
	//clear previous error if any
	errList := map[string]string{}
	var issue = models.Issue{}
	body, err := io.ReadAll(c.Request.Body)
	// if error in marsheling body
	if err != nil {
		errList["Invalid_body"] = "Unable to get request"
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"status": http.StatusUnprocessableEntity,
			"error":  errList,
			"ok":     false,
		})
		return
	}

	err = json.Unmarshal(body, &issue)
	if err != nil {
		errList["Invalid_body"] = "Unable to get request"
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"status": http.StatusUnprocessableEntity,
			"error":  errList,
		})
		return
	}
	// validating the user data based on our schema
	errorMessages := issue.Validate()
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
	err = h.DB.Create(&body).Error
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
		"data":     body,
	})

}

func (h Handler) GetAllIssues(c *gin.Context) {
	// results will be stored in this variable
	// if request is successful
	var issues []models.Issue
	if result := h.DB.Find(&issues); result.Error != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"status": http.StatusInternalServerError,
			"error":  "couldn't find the issues",
			"ok":     false,
		})
	}
	c.JSON(http.StatusCreated, gin.H{
		"status":   http.StatusCreated,
		"response": "Issues read successfully",
		"ok":       true,
		"data":     issues,
	})
}

func (h Handler) GetIssueByID(c *gin.Context) {
	var issues []models.Issue
	id := c.Param("id")
	if result := h.DB.Find(&issues, id); result.Error != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"status": http.StatusInternalServerError,
			"error":  "couldn't find the issue",
			"ok":     false,
		})
	}

	c.JSON(http.StatusCreated, gin.H{
		"status":   http.StatusCreated,
		"response": "Issue read successfully",
		"ok":       true,
		"data":     issues,
	})
}
