package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"github.com/sreehari2003/kseb/models"
)

func (h Handler) ChangeStatusHandler(ctx *gin.Context) {
	// Get the issue ID from the request URL
	issueID := ctx.Param("id")

	// Check if the issue entry exists in the database
	var issue models.Issue
	if err := h.DB.First(&issue, issueID).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "Issue entry not found"})
			return
		}
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch Issue entry"})
		return
	}

	// Get the authenticated official (LineMan)
	official, exists := ctx.Get("official")
	if !exists {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get authenticated official"})
		return
	}

	// Check if the official is authorized to change the status
	lineMan, ok := official.(*models.Officials)
	if !ok || lineMan.Role != models.LineMan {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	// Update the status fields based on the request body
	var updateData struct {
		Working   bool `json:"working"`
		Completed bool `json:"completed"`
	}
	if err := ctx.ShouldBindJSON(&updateData); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	// Update the status fields in the issue entry
	var isdone models.IsDone
	if err := h.DB.FirstOrCreate(&isdone, models.IsDone{IssueID: issue.ID}).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update IsDone entry"})
		return
	}
	isdone.Working = updateData.Working
	isdone.Completed = updateData.Completed

	// Save the updated isdone entry to the database
	if err := h.DB.Save(&isdone).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update IsDone entry"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Status updated successfully"})
}
