package service

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt"
)

func GenerateJWT(email string, rolesID int64) (string, error) {
	secretKey := os.Getenv("JWT_SECRET")
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"email":  email,
		"roleID": rolesID,
		"exp":    time.Now().Add(time.Hour * 2).Unix(),
	})

	return token.SignedString([]byte(secretKey))
}
