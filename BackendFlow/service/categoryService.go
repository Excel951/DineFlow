package service

import (
	"errors"

	"BackEndFlow/models"
	"BackEndFlow/repository"
)

type CategoryService interface {
	GetCategory() ([]models.Category, error)
}

type categoryServiceImpl struct {
	categoryRepo repository.CategoryRepository
}

func NewCategoryService(categoryRepo repository.CategoryRepository) CategoryService {
	return &categoryServiceImpl{categoryRepo: categoryRepo}
}

func (s *categoryServiceImpl) GetCategory() ([]models.Category, error) {
	categories, err := s.categoryRepo.GetCategory()
	if err != nil {
		return nil, errors.New(err.Error())
	}
	return categories, nil
}
