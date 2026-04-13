package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Product struct {
	ID          uuid.UUID `gorm:"primaryKey"`
	SKU         string    `json:"sku" gorm:"type:varchar(50);uniqueIndex"`
	CategoryID  uuid.UUID `json:"category_id" gorm:"not null"`
	Category    Category  `gorm:"foreignKey:CategoryID"`
	Name        string    `json:"name" gorm:"type:varchar(100);not null"`
	Description string    `json:"desc" gorm:"type:text"`
	Price       int64     `json:"price" gorm:"not null"` // Gunakan int64 untuk Rupiah
	ImageURL    string    `json:"image_url" gorm:"type:varchar(255)"`
	IsAvailable bool      `gorm:"default:true"`
	CreatedAt   time.Time
	UpdatedAt   time.Time
	DeletedAt   gorm.DeletedAt `gorm:"index"`
}

func NewProduct(sku string, categoryID uuid.UUID, name string, desc string, price int64, imageURL string) *Product {
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
