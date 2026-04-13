package models

type Role struct {
	ID   int64  `gorm:"primaryKey" `
	Name string `json:"name" gorm:"unique"`
	User []User `gorm:"foreignKey:RoleID;constraint:OnUpdate:RESTRICT,OnDelete:RESTRICT;"`
}

func NewRole(name string) *Role {
	return &Role{
		Name: name,
	}
}
