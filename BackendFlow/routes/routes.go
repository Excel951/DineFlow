package routes

import (
	"BackEndFlow/handler"
	"BackEndFlow/middleware"
	"BackEndFlow/repository"
	"BackEndFlow/service"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RegisterRouter(server *gin.Engine, db *gorm.DB) {
	// --- PROSES WIRING (Dependency Injection) ---

	// 1. Buat Repository (Penjaga Gudang)
	userRepo := repository.NewUserRepository(db)
	categoryRepo := repository.NewCategoryRepository(db)

	// 2. Buat Service (Manajer) -> Suntikkan Repo ke dalamnya
	authService := service.NewAuthService(userRepo)
	categoryService := service.NewCategoryService(categoryRepo)

	// 3. Buat Handler (Pelayan) -> Suntikkan Service ke dalamnya
	authHandler := handler.NewAuthHandler(authService)
	categoryHandler := handler.NewCategoryHandler(categoryService)

	// --- SETUP ROUTING GIN ---

	api := server.Group("/api")
	{
		// Saat ada user akses POST /api/login, Gin akan menyerahkannya ke authHandler
		api.POST("/login", authHandler.Login)

		protected := api.Group("/")
		protected.Use(middleware.AuthMiddleware())
		{
			// Sekarang /api/profile dikawal oleh middleware
			protected.GET("/profile", authHandler.Profile)
			protected.GET("/categories", categoryHandler.GetCategory)
		}
	}
}
