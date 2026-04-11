package models

type Role struct {
	ID   int64  `json:"id" gorm:"primaryKey" `
	Name string `json:"name" gorm:"unique"`
}

func NewRole(name string) *Role {
	return &Role{
		Name: name,
	}
}
