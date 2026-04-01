package config

import (
	"BackEndFlow/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func NewDatabase() *gorm.DB {
	db, err := gorm.Open(sqlite.Open("api.db"), &gorm.Config{})

	if err != nil {
		panic(err)
	}

	db.AutoMigrate(
		models.User{},
		models.Product{},
		models.Order{},
		models.Category{},
		models.OrderItem{},
	)

	sqlDB, err := db.DB()
	if err != nil {
		panic(err)
	}

	sqlDB.SetMaxOpenConns(25)
	sqlDB.SetMaxIdleConns(5)

	return db
}
