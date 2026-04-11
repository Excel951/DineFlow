package repository

import (
	"errors"

	"BackEndFlow/models"

	"gorm.io/gorm"
)

type CategoryRepository interface {
	GetCategory() ([]models.Category, error)
}

type categoryRepoImpl struct {
	db *gorm.DB
}

func NewCategoryRepository(db *gorm.DB) CategoryRepository {
	return &categoryRepoImpl{db: db}
}

func (r *categoryRepoImpl) GetCategory() ([]models.Category, error) {
	var category []models.Category

	err := r.db.Preload("Products").Find(&category).Error
	if err != nil {
		return nil, errors.New(err.Error())
	}

	return category, nil
}
