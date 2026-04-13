package models

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
	ID        uuid.UUID `gorm:"primaryKey"`
	Email     string    `json:"email" gorm:"unique"`
	Name      string    `json:"name"`
	Password  string    `json:"password"`
	RoleID    int64     `json:"role_id" gorm:"index;not null"`
	Role      Role      `json:"role" gorm:"foreignKey:RoleID"`
	BirthDay  time.Time `json:"birth_day"`
	CreatedAt time.Time
	DeletedAt *time.Time
}

func NewUser(email string, password string, Role int64, BirthDay time.Time) *User {
	return &User{
		ID:        uuid.New(),
		Email:     email,
		Password:  password,
		RoleID:    Role,
		BirthDay:  BirthDay,
		CreatedAt: time.Now(),
		DeletedAt: nil,
	}
}
