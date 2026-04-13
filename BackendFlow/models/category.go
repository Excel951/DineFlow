package models

import "github.com/google/uuid"

type Category struct {
	ID          uuid.UUID `gorm:"type:uuid;primaryKey"`
	Name        string    `json:"name" gorm:"type:varchar(50);uniqueIndex;not null"`
	Description string    `json:"desc" gorm:"type:text"`
	Products    []Product `gorm:"foreignKey:CategoryID;constraint:OnUpdate:CASCADE,OnDelete:RESTRICT;"`
}

func NewCategory(name string, description string) *Category {
	return &Category{
		// Kita men-generate UUID secara acak (versi 4) saat objek dibuat
		ID:          uuid.New(),
		Name:        name,
		Description: description,
	}
}
