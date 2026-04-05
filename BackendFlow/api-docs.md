# API Documentation - DineFlow Backend

Dokumentasi ini dibuat untuk membantu tim Frontend mengintegrasikan aplikasi dengan Backend DineFlow.

## 1. Informasi Umum
- **Base URL:** `http://localhost:8080/api` (Development)
- **Format Data:** `application/json`

---

## 2. Autentikasi
Beberapa endpoint memerlukan token JWT untuk diakses. Token ini didapatkan setelah login berhasil.
- **Header:** `Authorization: Bearer <your_token>`

---

## 3. Daftar Endpoint

### A. Auth (Autentikasi)

#### 1. Login User
Digunakan untuk masuk ke aplikasi dan mendapatkan token akses.

- **URL:** `/login`
- **Method:** `POST`
- **Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
- **Response (200 OK):**
```json
{
  "message": "Login berhasil",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "User": {
    "id": "uuid-string",
    "email": "user@example.com",
    "name": "Nama User",
    "role_id": 1,
    "role": {
       "id": 1,
       "name": "Staff"
    },
    "birth_day": "2000-01-01T00:00:00Z"
  }
}
```
- **Response (401 Unauthorized):**
```json
{
  "message": "invalid credentials"
}
```
- **Response (400 Bad Request):**
```json
{
  "message": "Key: 'LoginRequest.Email' Error:Field validation for 'Email' failed on the 'email' tag"
}
```

---

## 4. Struktur Data (Models)

### User Object
| Field | Type | Description |
|---|---|---|
| `id` | UUID | ID unik user |
| `email` | String | Email user (unik) |
| `name` | String | Nama lengkap user |
| `role_id` | Integer | ID Role user |
| `birth_day` | ISO8601 String | Tanggal lahir user |

---

## 5. Penanganan Error (Error Handling)
Backend menggunakan kode status HTTP standar:
- `200`: Berhasil (OK)
- `201`: Berhasil dibuat (Created)
- `400`: Input tidak valid (Bad Request)
- `401`: Tidak diizinkan/Belum login (Unauthorized)
- `403`: Dilarang akses/Kurang hak akses (Forbidden)
- `404`: Data tidak ditemukan (Not Found)
- `500`: Kesalahan Server (Internal Server Error)

---

> **Note:** Dokumentasi ini akan terus diperbarui seiring dengan penambahan fitur di sisi Backend. Jika ada kendala integrasi, silakan hubungi tim Backend.
