package models

import (
	"time"

	"github.com/google/uuid"
)

const (
	OrderStatusBaru     = 0
	OrderStatusDiproses = 1
	OrderStatusSelesai  = 2
	OrderStatusBatal    = 3
)

type Order struct {
	ID          uuid.UUID   `gorm:"type:uuid;primaryKey"`
	OrderNumber string      `json:"order_number" gorm:"type:varchar(20);uniqueIndex;not null"`
	TableNumber string      `json:"table_number" gorm:"type:varchar(10)"`
	Status      int         `json:"status" gorm:"default:0;index"` // 0: Baru, 1: Diproses, 2: Selesai, 3: Batal
	TotalAmount int64       `gorm:"not null;default:0"`
	Items       []OrderItem `gorm:"foreignKey:OrderID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"` // Relasi Has Many ke OrderItem
	CreatedAt   time.Time
	UpdatedAt   time.Time
}

func NewOrder(OrderNumber string, TableNumber string, Status int, TotalAmount int64) *Order {
	return &Order{
		ID:          uuid.New(),
		OrderNumber: OrderNumber,
		TableNumber: TableNumber,
		Status:      0,
		TotalAmount: 0,
		CreatedAt:   time.Now(),
	}
}
