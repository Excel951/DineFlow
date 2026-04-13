package config

import (
	"os"

	"BackEndFlow/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func NewDatabase() *gorm.DB {
	db, err := gorm.Open(sqlite.Open(os.Getenv("DB_PATH")), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	err = db.AutoMigrate(
		models.User{},
		models.Role{},
		models.Category{},
		models.Product{},
		models.Order{},
		models.OrderItem{},
	)
	if err != nil {
		panic(err.Error())
	}

	sqldb, err := db.DB()
	if err != nil {
		panic(err.Error())
	}

	sqldb.SetConnMaxLifetime(25)
	sqldb.SetConnMaxIdleTime(5)

	// RunSeeder(db)

	return db
}
