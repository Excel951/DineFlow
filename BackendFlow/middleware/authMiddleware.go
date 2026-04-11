package middleware

import (
	"errors"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")

		if authHeader == "" || !strings.HasPrefix(authHeader, "Bearer ") {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Authorization header diperlukan"})
			return
		}

		tokenString := strings.Replace(authHeader, "Bearer ", "", 1)

		token, err := jwt.Parse(tokenString, func(t *jwt.Token) (any, error) {
			secretKey := os.Getenv("JWT_SECRET")
			if tokenString == "" {
				return nil, errors.New("token String kosong")
			}
			return []byte(secretKey), nil
		})
		if err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			email := claims["email"].(string)
			c.Set("email", email)
			c.Next()
		} else {
			c.AbortWithStatusJSON(401, gin.H{"error": "Token tidak valid"})
			return
		}
	}
}
