package config

import (
	"log"
	"os"
	"time"

	"BackEndFlow/models"

	// Sesuaikan dengan nama modul project Anda

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// RunSeeder bertugas memasukkan data awal (Roles dan Super User)
func RunSeeder(db *gorm.DB) {
	log.Println("Menjalankan Database Seeder...")

	// 1. Seed Roles (Admin dan Karyawan)
	roles := []string{"admin", "karyawan"}
	for _, roleName := range roles {
		var role models.Role
		// FirstOrCreate: Cari role berdasarkan nama, jika tidak ada, buat baru
		err := db.Where("name = ?", roleName).FirstOrCreate(&role, models.Role{
			Name: roleName,
		}).Error
		if err != nil {
			log.Fatalf("Gagal melakukan seed role %s: %v", roleName, err)
		}
	}

	// 2. Cari ID Role "admin" yang baru saja dibuat
	var adminRole models.Role
	db.Where("name = ?", "admin").First(&adminRole)

	// 3. Hash Password untuk Super User
	passwordString := os.Getenv("SUPER_USER_PASSWORD") // Ganti dengan password yang lebih kuat nanti
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(passwordString), bcrypt.DefaultCost)
	if err != nil {
		log.Fatalf("Gagal melakukan hash password: %v", err)
	}

	// 4. Seed Super User (Admin)
	adminEmail := os.Getenv("SUPER_USER_EMAIL")

	var superUser models.User

	// Cek apakah admin dengan email ini sudah ada
	err = db.Where("email = ?", adminEmail).FirstOrCreate(&superUser, models.User{
		ID:        uuid.New(), // Generate UUID untuk admin
		Email:     adminEmail,
		Name:      "Super Administrator",
		Password:  string(hashedPassword),
		RoleID:    adminRole.ID, // Hubungkan dengan Role Admin
		BirthDay:  time.Now(),
		CreatedAt: time.Now(),
	}).Error
	if err != nil {
		log.Fatalf("Gagal melakukan seed super user: %v", err)
	}

	log.Println("Seeding Categories & Products...")

	// 5. Seed Categories
	// Kita buat map untuk menyimpan ID kategori agar mudah dipanggil saat seed product
	categories := []models.Category{
		{Name: "Makanan Berat", Description: "Menu nasi dan lauk utama"},
		{Name: "Minuman", Description: "Segala jenis minuman segar"},
		{Name: "Cemilan", Description: "Snack dan makanan ringan"},
	}

	categoryMap := make(map[string]uuid.UUID)

	for _, cat := range categories {
		var existingCat models.Category
		// Cek berdasarkan nama kategori
		err := db.Where("name = ?", cat.Name).FirstOrCreate(&existingCat, models.Category{
			ID:          uuid.New(),
			Name:        cat.Name,
			Description: cat.Description,
		}).Error
		if err != nil {
			log.Printf("Gagal seed kategori %s: %v", cat.Name, err)
			continue
		}
		// Simpan ID yang aktif (baik yang baru dibuat atau yang sudah ada) ke map
		categoryMap[cat.Name] = existingCat.ID
	}

	// 6. Seed Products
	products := []models.Product{
		{
			Name:        "Nasi Goreng DineFlow",
			SKU:         "FOOD-001",
			Price:       25000,
			CategoryID:  categoryMap["Makanan Berat"],
			IsAvailable: true,
		},
		{
			Name:        "Es Jeruk Peras",
			SKU:         "DRINK-001",
			Price:       8000,
			CategoryID:  categoryMap["Minuman"],
			IsAvailable: true,
		},
		{
			Name:        "Kentang Goreng",
			SKU:         "SNACK-001",
			Price:       15000,
			CategoryID:  categoryMap["Cemilan"],
			IsAvailable: true,
		},
	}

	for _, prod := range products {
		var existingProd models.Product
		// Cek berdasarkan SKU (karena SKU unik)
		err := db.Where("sku = ?", prod.SKU).FirstOrCreate(&existingProd, models.Product{
			ID:          uuid.New(),
			SKU:         prod.SKU,
			Name:        prod.Name,
			Price:       prod.Price,
			CategoryID:  prod.CategoryID,
			IsAvailable: prod.IsAvailable,
			CreatedAt:   time.Now(),
		}).Error
		if err != nil {
			log.Printf("Gagal seed produk %s: %v", prod.Name, err)
		}
	}

	log.Println("Database Seeder selesai dijalankan!")
}
