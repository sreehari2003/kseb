package controller

import (
	"encoding/json"
	"io"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sreehari2003/kseb/models"
	"github.com/uptrace/bun"
)

type Handler struct {
	DB *bun.DB
}

func New(db *bun.DB) Handler {
	return Handler{db}
}

// Create Issue
// @Summary Create Electricty Issue
// @Param reqBody body models.Issue true "Example Request Body"
// @Accept  json
// @Produce  json
// @Router /issue [post]
func (h Handler) CreateIssue(c *gin.Context) {
	//clear previous error if any
	errList := map[string]string{}
	var issue = models.Issue{}
	body, err := io.ReadAll(c.Request.Body)
	// if error in marsheling body``
	if err != nil {
		errList["Invalid_body"] = "error in reading user data"
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"status": http.StatusUnprocessableEntity,
			"error":  errList,
			"ok":     false,
		})
		return
	}

	err = json.Unmarshal(body, &issue)
	if err != nil {
		errList["Invalid_body"] = "error in reading user data"
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
	res, err := h.DB.NewInsert().Model(&issue).Exec(c)

	if err != nil {
		// sending succes message with data to client
		c.JSON(http.StatusCreated, gin.H{
			"status":   http.StatusExpectationFailed,
			"response": "Issue creation failed",
			"ok":       false,
		})
		return
	}

	// sending succes message with data to client
	c.JSON(http.StatusCreated, gin.H{
		"status":   http.StatusCreated,
		"response": "Issue created successfully",
		"ok":       true,
		"data":     res,
	})

}

// Get all Issues
// @Summary Returns all the existin issues
// @Produce  json
// @Router /issue [get]
func (h Handler) GetAllIssues(c *gin.Context) {
	// results will be stored in this variable
	// if request is successful
	var issues []models.Issue
	err := h.DB.NewSelect().Model(&issues).Scan(c)
	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"status": http.StatusInternalServerError,
			"error":  "couldn't find the issues",
			"ok":     false,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":   http.StatusOK,
		"response": "Issues read successfully",
		"ok":       true,
		"data":     issues,
	})
}

// Get Single Issue
// @Summary Returns A Single Issue With id
// @Produce  json
// @Router /issue/:id [get]
func (h Handler) GetIssueByID(c *gin.Context) {
	var issues []models.Issue
	ID := c.Param("id")
	if result := h.DB.NewSelect().Model(&issues).Where("id=?", ID).Scan(c); result.Error != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"status": http.StatusInternalServerError,
			"error":  "couldn't find the issue",
			"ok":     false,
		})
	}

	c.JSON(http.StatusOK, gin.H{
		"status":   http.StatusOK,
		"response": "Issue read successfully",
		"ok":       true,
		"data":     issues,
	})
}

// Get Single Issue
// @Summary Returns A Single Issue With Post_id
// @Query post_id
// @Produce  json
// @Router /issue [get]
func (h Handler) SearchIssueByPostNumber(c *gin.Context) {
	var issues []models.Issue
	post_id := c.Query("post_id")

	if post_id == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"status": http.StatusBadRequest,
			"error":  "postNumber parameter is required",
			"ok":     false,
		})
		return
	}

	if result := h.DB.NewSelect().Model(&issues).Where("post_id = ?", post_id).Scan(c); result.Error != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"status": http.StatusInternalServerError,
			"error":  "couldn't find the issues",
			"ok":     false,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":   http.StatusOK,
		"response": "Issue search successful",
		"ok":       true,
		"data":     issues,
	})
}

func (h Handler) GetIssueWithFormHandler(c *gin.Context) {
	ID := c.Param("id")
	var issue models.Issue
	if result := h.DB.NewSelect().Model(&issue).Where("id=?", ID).Scan(c); result.Error != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"status": http.StatusInternalServerError,
			"error":  "couldn't find the issue",
			"ok":     false,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status":   http.StatusOK,
		"response": "Issue read successfully",
		"ok":       true,
		"data":     issue,
	})
}

func (h Handler) DeleteAllIssue(c *gin.Context) {
	var issues []models.Issue
	res, err := h.DB.NewDelete().Model(&issues).Exec(c)
	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"status": http.StatusInternalServerError,
			"error":  "couldn't Delete the issue",
			"ok":     false,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":   http.StatusOK,
		"response": "All Issue Was Deleted successfully",
		"ok":       true,
		"data":     res,
	})
}
