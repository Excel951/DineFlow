package models

import (
	"github.com/google/uuid"
)

type OrderItem struct {
	ID           uuid.UUID `gorm:"type:uuid;primaryKey"`
	OrderID      uuid.UUID `json:"order_id" gorm:"type:uuid;not null;index"`
	Order        Order     `gorm:"foreignKey:OrderID"`
	ProductID    uuid.UUID `json:"product_id" gorm:"type:uuid;not null"`
	Product      Product   `gorm:"foreignKey:ProductID"` // Relasi Belongs To
	Quantity     int       `json:"quantity" gorm:"not null;default:1"`
	PriceAtOrder int64     `json:"price_at_order" gorm:"not null"`
	Notes        string    `json:"notes" gorm:"type:text"`
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
