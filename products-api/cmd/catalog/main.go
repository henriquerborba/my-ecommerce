package catalog

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/henriquerborba/my-ecommerce/products-api/internal/database"
	"github.com/henriquerborba/my-ecommerce/products-api/internal/service"
	"github.com/henriquerborba/my-ecommerce/products-api/internal/webserver"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	db, err := sql.Open("mysql", "root:root@tcp(localhost:3306)/my-ecommerce")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	categoryDB := database.NewCategoryDb(db)
	categoryService := service.NewCategoryService(categoryDB)

	productDB := database.NewProductDb(db)
	productService := service.NewProductService(productDB)

	webCategoryHandler := webserver.NewWebCategoryHandler(categoryService)

	webProductHandler := webserver.NewProductHandler(productService)

	c := chi.NewRouter()
	c.Use(middleware.Logger)
	c.Use(middleware.Recoverer)
	c.Get("/categories", webCategoryHandler.GetCategories)
	c.Get("/categories/{id}", webCategoryHandler.GetCategory)
	c.Post("/categories", webCategoryHandler.CreateCategory)

	c.Get("/products", webProductHandler.GetProducts)
	c.Get("/products/{id}", webProductHandler.GetProduct)
	c.Get("/products/category/{categoryID}", webProductHandler.GetProductByCategoryId)
	c.Post("/products", webProductHandler.CreateProduct)

	fmt.Println("Server is running on port 8080")
	http.ListenAndServe(":8080", c)
}
