## Persyaratan
- Node.js 
- MySql

## Instalasi
### 1. Instal Dependencies

npm install

### 2. Konfigurasi Database

Membuat database:
- CREATE DATABASE jsm;

### 3. Konfigurasi Environment

Buat file .env di root folder project lalu isikan sebagai berikut:

- DB_HOST=sesuaikan dengan host mysql di device
- DB_NAME=sesuaikan dengan nama database yang telah dibuat untuk project
- DB_USER=sesuaikan dengan pengaturan username mysql di device
- DB_PASS=sesuaikan dengan pengaturan password mysql di device
- JWT_SECRET=your-jwt-key (bisa dengan string bebas)

### 4. Migrasi Database

Untuk database sendiri karena pada project ini menggunakan ORM jadi struktur database akan dibuat otomatis oleh orm melalui model yang telah di define pada project

example data department dapat di execute melalui perintal sql berikut:

INSERT INTO t_department (name) VALUES ('HR'), ('Engineering');

Untuk struktur database dapat didownload pada link berikut:
https://drive.google.com/file/d/1dJpQpJ0yK_QHXyH2oxfn9vMEgHwhOLz8/view?usp=sharing

### 5. Menjalankan Aplikasi

Aplikasi dapat dijalankan dengan perintah:
- npm run dev

### 6. Dokumentasi Endpoint

Dokumentasi endpoint dapat dilihat pada link berikut:
https://documenter.getpostman.com/view/16238301/2sAXxV7WA9
