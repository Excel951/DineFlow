package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Product struct {
	ID          uuid.UUID `gorm:"primaryKey"`
	SKU         string    `gorm:"type:varchar(50);uniqueIndex"`
	CategoryID  string    `gorm:"not null"`
	Name        string    `gorm:"type:varchar(100);not null"`
	Description string    `gorm:"type:text"`
	Price       int64     `gorm:"not null"` // Gunakan int64 untuk Rupiah
	ImageURL    string    `gorm:"type:varchar(255)"`
	IsAvailable bool      `gorm:"default:true"`
	CreatedAt   time.Time
	UpdatedAt   time.Time
	DeletedAt   gorm.DeletedAt `gorm:"index"`
}

func NewProduct(sku string, categoryID string, name string, desc string, price int64, imageURL string) *Product {
	return &Product{
		ID:          uuid.New(),
		SKU:         sku,
		CategoryID:  categoryID,
		Name:        name,
		Description: desc,
		Price:       price,
		ImageURL:    imageURL,
		IsAvailable: true,
		CreatedAt:   time.Now(),
	}
}
