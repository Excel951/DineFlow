package config

import (
	"BackEndFlow/models"
	"log"
	"time"

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
	passwordString := "Sembarangwes214101000452141010002921410100027@ashiap" // Ganti dengan password yang lebih kuat nanti
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(passwordString), bcrypt.DefaultCost)
	if err != nil {
		log.Fatalf("Gagal melakukan hash password: %v", err)
	}

	// 4. Seed Super User (Admin)
	adminEmail := "superadmin@resto.com"
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

	log.Println("Database Seeder selesai dijalankan!")
}
