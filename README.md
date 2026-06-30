# 🎬 FootageBooks - E-Commerce Marketplace Sistem Terintegrasi

### 🔗 Tautan Penting Proyek
* **Link Live Website (GitHub Pages):** [https://fznnbwi24.github.io/FootageBooks-Project/]
* **Link Repository GitHub:** [https://github.com/fznnbwi24/FootageBooks-Project]

---

## 1. Business Overview & Dokumentasi

### A. Nama Bisnis, Deskripsi, & Value Proposition
* **Nama Bisnis:** FootageBooks
* **Deskripsi:** Marketplace buku bacaan fisik berbasis web yang mengkhususkan diri pada kurasi literatur fiksi populer seperti novel, komik/manga, serta kumpulan cerita pendek (cerpen).
* **Value Proposition:** "Membawa Pengalaman Sinematik Lewat Lembaran Buku". FootageBooks berfokus pada navigasi katalog yang sangat visual, klasifikasi genre yang tegas, dan proses pembelian langsung *one-click-checkout* tanpa pendaftaran rumit.

### B. Target Market & Segmentasi Pelanggan
* **Demografis:** Remaja hingga dewasa muda (Usia 15–30 tahun), pelajar, mahasiswa, dan pekerja sektor kreatif.
* **Geografis:** Area urban dan sub-urban di Indonesia yang memiliki akses layanan ekspedisi kurir reguler/COD.
* **Psikografis:** Penggemar budaya pop, penikmat kultur visual (anime/film), dan kolektor buku fisik.

### C. Strategi Harga, Promosi, & Revenue Stream
* **Revenue Stream:** Keuntungan margin dari penjualan langsung retail setiap unit buku.
* **Strategi Promosi:** Bundling paket genre (Contoh: Beli 2 Komik Gratis 1 Cerpen) dan penawaran opsi COD untuk menjangkau pembeli non-bank.

### D. Alur Checkout & Simulasi Payment Gateway
Sistem checkout langsung memproses data di dalam aplikasi web:
1. Pengguna memasukkan data pengiriman pada form validasi native HTML5.
2. Saat tombol "Bayar Sekarang" ditekan, sistem merekap transaksi, mengosongkan *LocalStorage* secara aman, dan langsung memunculkan pop-up Nota/Resi Pembayaran Berhasil sebagai simulasi sukses halaman pembayaran (Midtrans Sandbox).

### E. Integrasi Data Analytics & Metrik Utama
Sistem web dikonfigurasi menggunakan Google Analytics Universal Tracker dengan pemantauan metrik:
* **Conversion Rate:** Menghitung jumlah klik checkout dibanding total visitor unik harian.
* **Bounce Rate:** Mengidentifikasi tingkat relevansi visual halaman *Hero Banner* terhadap minat pembaca.

---

## 2. Technical Stack Explanation
* **Struktur Dasar:** Pure Semantic HTML5 & CSS Grid/Flexbox Layout.
* **Logika Aplikasi:** JavaScript Vanilla (ES6+) Tanpa Framework Eksternal.
* **Penyimpanan Data:** Perangkat Client-side via API `window.localStorage` guna mempertahankan status keranjang belanja saat terjadi interupsi browser (refresh/tutup tab).