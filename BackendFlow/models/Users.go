package models

import "time"

type User struct {
	Id        int       `json:"id"`
	Email     string    `json:"email"`
	Name      string    `json:"name"`
	Password  string    `json:"pasword"`
	Role      string    `json:"role"`
	BirthDay  time.Time `json:"birth_day"`
	createdAt time.Time
	deletedAt *time.Time
}

func NewUser(email string, password string, BirthDay time.Time) *User {
	return &User{
		Email:     email,
		Password:  password,
		Role:      "karyawan",
		BirthDay:  BirthDay,
		createdAt: time.Now(),
		deletedAt: nil,
	}
}
