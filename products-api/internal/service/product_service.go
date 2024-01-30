package service

import (
	"github.com/henriquerborba/my-ecommerce/products-api/internal/database"
	"github.com/henriquerborba/my-ecommerce/products-api/internal/entity"
)

type ProductService struct {
	ProductDB *database.ProductDB
}

func NewProductService(productDB *database.ProductDB) *ProductService {
	return &ProductService{
		ProductDB: productDB,
	}
}

func (ps *ProductService) GetProducts() ([]*entity.Product, error) {
	products, err := ps.ProductDB.GetProducts()
	if err != nil {
		return nil, err
	}

	return products, nil
}

func (ps *ProductService) GetProduct(id string) (*entity.Product, error) {
	product, err := ps.ProductDB.GetProduct(id)
	if err != nil {
		return nil, err
	}

	return product, nil
}

func (ps *ProductService) GetProductByCategoryId(id string) ([]*entity.Product, error) {
	products, err := ps.ProductDB.GetProductByCategoryId(id)
	if err != nil {
		return nil, err
	}

	return products, nil
}

func (ps *ProductService) CreateProduct(name, description, categoryID, imageURL string, price float64) (*entity.Product, error) {
	product := entity.NewProduct(name, description, price, categoryID, imageURL)

	_, err := ps.ProductDB.CreateProduct(product)
	if err != nil {
		return nil, err
	}

	return product, nil
}
