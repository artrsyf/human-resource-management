package repository

import "back/pkg/models"

type UserRepo interface {
	GetUsersFromRepo() ([]*models.User, error)
}
