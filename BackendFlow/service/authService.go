package service

import (
	"BackEndFlow/repository"
	"errors"

	"golang.org/x/crypto/bcrypt"
)

type AuthServer interface {
	Login(email string, password string) (string, error)
}

type authServiceImpl struct {
	userRepo repository.UserRepository
}

func NewAuthService(userRepo repository.UserRepository) AuthServer {
	return &authServiceImpl{userRepo: userRepo}
}

func (s *authServiceImpl) Login(email string, password string) (string, error) {
	user, err := s.userRepo.FindEmail(email)
	if err != nil {
		return "", errors.New("email atau password salah")
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		return "", errors.New("email atau password salah")
	}

	token, err := GenerateJWT(user.Email, user.RoleID)
	if err != nil {
		return "", errors.New("gagal membuat token autentikasi")
	}

	return token, nil
}
