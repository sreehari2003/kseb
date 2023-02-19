package controller

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/sreehari2003/kseb/models"
	"gorm.io/gorm"
)

type handler struct {
	DB *gorm.DB
}

func New(db *gorm.DB) handler {
	return handler{db}
}

func (h handler) GetAllIssues(c *gin.Context) {
	// results will be stored in this variable
	// if request is successful
	var issues []models.Issue
	if result := h.DB.Find(&issues); result.Error != nil {
		fmt.Println(result.Error)
	}
}

func (h handler) GetIssueByID(c *gin.Context) {}
