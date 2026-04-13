package handler

import (
	"net/http"

	"BackEndFlow/service"

	"github.com/gin-gonic/gin"
)

type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
}

type AuthHandler struct {
	authService service.AuthService
}

func NewAuthHandler(authService service.AuthService) *AuthHandler {
	return &AuthHandler{authService: authService}
}

func (h *AuthHandler) Login(c *gin.Context) {
	var req *LoginRequest
	err := c.ShouldBindJSON(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	token, user, err := h.authService.Login(req.Email, req.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": err.Error()})
		return
	}

	c.JSON(200, gin.H{
		"info":  ResStatus{Status: "success", Message: "Login berhasil"},
		"token": token,
		"role":  user.Role,
	})
}

func (h *AuthHandler) Profile(c *gin.Context) {
	val, exists := c.Get("email")

	email, ok := val.(string)
	if !exists || !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Data tidak ada"})
		return
	}

	user, err := h.authService.Profile(email)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email tidak ada"})
	}

	c.JSON(200, gin.H{
		"info": ResStatus{Status: "success", Message: "Data berhasil di dapat"}, "data": gin.H{
			"nama": user.Name, "email": user.Name, "role": user.Role, "BirthDay": user.BirthDay,
		},
	})
}

// func SignUp() {
//
// }
