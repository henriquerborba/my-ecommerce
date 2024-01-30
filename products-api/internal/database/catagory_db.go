package database

import (
	"database/sql"

	"github.com/henriquerborba/my-ecommerce/products-api/internal/entity"
)

type CategoryDB struct {
	db *sql.DB
}

func NewCategoryDb(db *sql.DB) *CategoryDB {
	return &CategoryDB{
		db: db,
	}
}

func (cd *CategoryDB) GetCategories() ([]*entity.Category, error) {
	rows, err := cd.db.Query("SELECT id, name FROM categories")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	categories := []*entity.Category{}

	for rows.Next() {
		category := &entity.Category{}
		err := rows.Scan(&category.ID, &category.Name)
		if err != nil {
			return nil, err
		}
		categories = append(categories, category)
	}

	return categories, nil
}

func (cd *CategoryDB) GetCategory(id string) (*entity.Category, error) {
	var category entity.Category
	err := cd.db.QueryRow("SELECT id, name FROM categories WHERE id = ?", id).Scan(&category.ID, &category.Name)
	if err != nil {
		return nil, err
	}
	return &category, nil
}

func (cd *CategoryDB) CreateCategory(category *entity.Category) (string, error) {
	_, err := cd.db.Query("INSERT INTO categories (id, name) VALUES (?, ?)", category.ID, category.Name)
	if err != nil {
		return "", err
	}
	return category.ID, nil
}
