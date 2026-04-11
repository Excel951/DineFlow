package models

import (
	"github.com/google/uuid"
)

type OrderItem struct {
	ID           uuid.UUID `gorm:"type:uuid;primaryKey"`
	OrderID      uuid.UUID `gorm:"type:uuid;not null;index"`
	ProductID    uuid.UUID `gorm:"type:uuid;not null"`
	Product      Product   `gorm:"foreignKey:ProductID"` // Relasi Belongs To
	Quantity     int       `gorm:"not null;default:1"`
	PriceAtOrder int64     `gorm:"not null"`
	Notes        string    `gorm:"type:text"`
}

func NewOrderItem(orderID uuid.UUID, productID uuid.UUID, qty int, price int64, notes string) *OrderItem {
	return &OrderItem{
		ID:           uuid.New(),
		OrderID:      orderID,
		ProductID:    productID,
		Quantity:     qty,
		PriceAtOrder: price,
		Notes:        notes,
	}
}
