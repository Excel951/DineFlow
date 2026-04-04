package main

import (
	"BackEndFlow/config"
	"BackEndFlow/routes"
	"log"
	"os"

	"github.com/joho/godotenv"

	// "github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	server := gin.Default()
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	// server.Use(cors.New(cors.Config{
	// 	// 1. Domain React kamu (ambil dari .env)
	// 	AllowOrigins: []string{os.Getenv("ALLOWED_ORIGIN")},

	// 	// 2. Method apa saja yang diizinkan
	// 	AllowMethods: []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},

	// 	// 3. Header yang diizinkan dikirim oleh React
	// 	// "Authorization" WAJIB ada agar token JWT tidak diblokir browser
	// 	AllowHeaders: []string{
	// 		"Origin",
	// 		"Content-Type",
	// 		"Accept",
	// 		"Authorization", // Ini kuncinya untuk JWT
	// 		"X-Requested-With",
	// 	},

	// 	// 4. Header yang boleh dibaca oleh React dari respon API
	// 	ExposeHeaders: []string{"Content-Length"},

	// 	// 5. Izinkan pengiriman cookies/auth headers
	// 	AllowCredentials: true,

	// 	// 6. Berapa lama browser boleh menyimpan hasil cek CORS ini (cache)
	// 	MaxAge: 12 * time.Hour,
	// }))
	db := config.NewDatabase()
	routes.RegisterRouter(server, db)
	server.Run(":" + os.Getenv("APP_PORT"))
}
