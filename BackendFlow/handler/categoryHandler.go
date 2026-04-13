package handler

import (
	"BackEndFlow/service"
	"net/http"

	"github.com/gin-gonic/gin"
)

type CategoryHandler struct {
	categoryService service.CategoryService
}

func NewCategoryHandler(categoryService service.CategoryService) *CategoryHandler {
	return &CategoryHandler{categoryService: categoryService}
}

func (h *CategoryHandler) GetCategory(c *gin.Context) {
	categories, err := h.categoryService.GetCategory()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"errors": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"info": ResStatus{Status: "success", Message: "Data sudah diambil"}, "data": categories})
}
