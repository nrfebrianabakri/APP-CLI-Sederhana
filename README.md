Program ini dibuat menggunakan Node.js untuk mengelola daftar tugas melalui Command Line Interface (CLI). Semua data disimpan di file tasks.json dan diproses secara asinkron menggunakan fs/promises serta async/await.

Fitur yang ada:
1. Menambahkan tugas
2. Melihat daftar tugas
3. Menghapus tugas
4. Menandai tugas selesai

Intruksi setup:
1. Pastikan Node.js sudah terpasang di komputer
2. Buat folder proyek
3. Inisialisasi folder dengan npm -y (membuat package.json (menyimpan informasi folder proyek))
4. Buat file program (index.js (file utama), taskManager (logika CRUD), tasks.json (tempat data disimpan))

Cara menjalankan:
1. Untuk menambahkan tugas = node index.js add "Nama Tugas" (misal: node index add "Tugas 1")
2. Untuk melihat daftar tugas = node index.js list
3. Untuk menghapus tugas = node index.js remove <ID> (misal: node index js remove 1)
4. Untuk menandai tugas selesai = node index.js done <ID> (misal: node index.js done 1)