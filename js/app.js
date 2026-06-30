// 1. DATABASE DEFAULT (Minimum 8 Produk sesuai ketentuan tugas dengan dukungan kolom gambar)
const defaultProducts = [
    { id: 1, title: "Laskar Pelangi", author: "Andrea Hirata", price: 85000, category: "Novel", image: "", color: "#0f766e", desc: "Kisah inspiratif perjuangan 10 anak Belitung mengejar mimpi lewat jalur pendidikan formal di tengah keterbatasan." },
    { id: 2, title: "Naruto Gaiden", author: "Masashi Kishimoto", price: 35000, category: "Komik", image: "", color: "#b45309", desc: "Petualangan seru generasi baru ninja Konoha yang dipimpin oleh Sarada Uchiha mencari jati dirinya." },
    { id: 3, title: "Filosofi Kopi", author: "Dee Lestari", price: 70000, category: "Cerpen", image: "", color: "#5b21b6", desc: "Kumpulan cerita pendek penuh makna tentang persahabatan, cinta, dan secangkir kopi hitam yang jujur." },
    { id: 4, title: "Bumi", author: "Tere Liye", price: 95000, category: "Novel", image: "", color: "#1e3a8a", desc: "Dunia paralel fantasi yang menegangkan mengenai petualangan tiga remaja SMA yang memiliki kekuatan unik." },
    { id: 5, title: "One Piece Vol. 100", author: "Eiichiro Oda", price: 35000, category: "Komik", image: "", color: "#9d174d", desc: "Edisi spesial perayaan chapter ke-1000 pertempuran sengit aliansi Luffy melawan Kaido di Negeri Wano." },
    { id: 6, title: "Sepotong Senja Pacarku", author: "Seno Gumira", price: 65000, category: "Cerpen", image: "", color: "#15803d", desc: "Kumpulan prosa romantis surealis yang legendaris tentang memotong senja di pantai dan mengirimkannya via pos." },
    { id: 7, title: "Ronggeng Dukuh Paruk", author: "Ahmad Tohari", price: 90000, category: "Novel", image: "", color: "#c2410c", desc: "Sisi humanis dan tragedi kehidupan penari ronggeng di sebuah dusun terpencil di Jawa Tengah pada masa pergolakan politik." },
    { id: 8, title: "Attack on Titan Vol. 34", author: "Hajime Isayama", price: 40000, category: "Komik", image: "", color: "#374151", desc: "Volume final klimaks pertarungan umat manusia melawan kutukan raksasa titan demi kebebasan mutlak dunia." }
];

// Ambil data dari LocalStorage, jika kosong gunakan defaultProducts di atas
let books = JSON.parse(localStorage.getItem('footage_books_data')) || defaultProducts;
let cart = JSON.parse(localStorage.getItem('footage_books_cart')) || [];
let currentCategory = 'semua';

// Jika di LocalStorage belum ada data sama sekali, kita set pertama kali agar sinkron dengan admin
if (!localStorage.getItem('footage_books_data')) {
    localStorage.setItem('footage_books_data', JSON.stringify(defaultProducts));
}

// DOM Elements
const bookDisplay = document.getElementById('book-display');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items-container');

// 2. FUNGSI MENAMPILKAN KATALOG UTAMA (Mendukung Gambar & Warna Kotak)
function displayBooks(bookList) {
    bookDisplay.innerHTML = "";
    if (bookList.length === 0) {
        bookDisplay.innerHTML = "<p style='grid-column: 1/-1; text-align:center; padding: 2rem; color: #64748b;'>Buku tidak ditemukan.</p>";
        return;
    }
    bookList.forEach(book => {
        // Logika Gambar: Jika kolom image diisi (link internet/lokal) gunakan tag <img>, jika kosong pakai warna kotak dummy
        const coverBuku = book.image 
            ? `<img src="${book.image}" alt="${book.title}" style="width:100%; height:250px; object-fit:cover; border-radius:6px; margin-bottom:1rem; cursor:pointer;">`
            : `<div class="book-cover" style="background: ${book.color || '#334155'}">${book.title}</div>`;

        bookDisplay.innerHTML += `
            <div class="book-card">
                <div onclick="openModal(${book.id})">
                    ${coverBuku}
                    <div class="book-title" style="margin-top:0.5rem;">${book.title}</div>
                    <div class="book-author">${book.author}</div>
                </div>
                <div>
                    <div class="book-price">Rp ${book.price.toLocaleString('id-ID')}</div>
                    <button class="btn-add" onclick="addToCart(${book.id})">Tambah</button>
                </div>
            </div>
        `;
    });
}

// 3. FITUR CARI & FILTER
function filterKategori(category, event) {
    currentCategory = category;
    document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
    if(event) event.target.classList.add('active');
    filterDanCari();
}

function filterDanCari() {
    // Ambil data terbaru dari localStorage (berjaga-jaga jika admin baru menambah buku di tab sebelah)
    books = JSON.parse(localStorage.getItem('footage_books_data')) || defaultProducts;
    
    const keyword = document.getElementById('search-input').value.toLowerCase();
    let filtered = books;

    if (currentCategory !== 'semua') {
        filtered = filtered.filter(b => b.category === currentCategory);
    }
    if (keyword) {
        filtered = filtered.filter(b => b.title.toLowerCase().includes(keyword) || b.author.toLowerCase().includes(keyword));
    }
    displayBooks(filtered);
}

// 4. MODAL DETAIL PRODUK (POP-UP)
function openModal(id) {
    const book = books.find(b => b.id === id);
    const modal = document.getElementById('product-modal');
    document.getElementById('modal-body-content').innerHTML = `
        <h2 style="color:var(--accent); margin-bottom:0.5rem;">${book.title}</h2>
        <p style="font-weight:bold; margin-bottom:1rem; color:#475569;">Penulis: ${book.author} | Kategori: ${book.category}</p>
        <p style="color:#64748b; line-height:1.6; margin-bottom:1.5rem; font-size:0.95rem;">${book.desc}</p>
        <h3 style="color:var(--primary); margin-bottom:1.5rem;">Harga: Rp ${book.price.toLocaleString('id-ID')}</h3>
        <button class="btn-add" onclick="addToCart(${book.id}); closeModal();">Tambah Ke Keranjang</button>
    `;
    modal.style.display = "flex";
}
function closeModal() { document.getElementById('product-modal').style.display = "none"; }

// 5. MANAJEMEN KERANJANG BELANJA
function addToCart(id) {
    const book = books.find(b => b.id === id);
    const item = cart.find(i => i.id === id);
    if(item) { item.qty++; } else { cart.push({ ...book, qty: 1 }); }
    updateCart();
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('open');
}

function updateQty(id, value) {
    const item = cart.find(i => i.id === id);
    if(item) { item.qty = parseInt(value) || 1; }
    updateCart();
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    updateCart();
}

function updateCart() {
    localStorage.setItem('footage_books_cart', JSON.stringify(cart));
    renderCart();
}

function renderCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0, count = 0;
    cart.forEach(item => {
        total += item.price * item.qty;
        count += item.qty;
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <div>
                    <h4 style="font-size:0.95rem; margin-bottom:0.2rem;">${item.title}</h4>
                    <span style="font-size:0.85rem; color:#64748b;">Rp ${item.price.toLocaleString('id-ID')}</span>
                </div>
                <div style="display:flex; align-items:center; gap:0.5rem;">
                    <input type="number" class="qty-input" value="${item.qty}" min="1" onchange="updateQty(${item.id}, this.value)">
                    <button class="btn-remove" onclick="removeFromCart(${item.id})">Hapus</button>
                </div>
            </div>
        `;
    });
    document.getElementById('cart-count').innerText = count;
    document.getElementById('cart-total').innerText = `Rp ${total.toLocaleString('id-ID')}`;
}

// 6. SIMULASI CHECKOUT LANGSUNG DI TEMPAT (NOTA POP-UP)
function prosesCheckout(e) {
    e.preventDefault();
    if(cart.length === 0) { alert("Keranjang kosong!"); return; }
    
    const name = document.getElementById('buyer-name').value;
    const address = document.getElementById('buyer-address').value;
    const payment = document.getElementById('payment-method').value;

    let total = 0;
    let daftarBukuHtml = '';
    cart.forEach((item) => {
        total += item.price * item.qty;
        daftarBukuHtml += `<li>${item.title} (x${item.qty}) - Rp ${(item.price * item.qty).toLocaleString('id-ID')}</li>`;
    });

    const noInvoice = "INV-" + Math.floor(Math.random() * 90000 + 10000);
    const modal = document.getElementById('product-modal');
    
    document.getElementById('modal-body-content').innerHTML = `
        <div style="text-align: center; padding: 0.5rem;">
            <span style="font-size: 3rem;">✅</span>
            <h2 style="color: #0d9488; margin-top: 0.5rem; font-size:1.5rem;">Pembayaran Berhasil!</h2>
            <p style="color: #64748b; font-size: 0.85rem;">Nomor Transaksi: <strong>${noInvoice}</strong></p>
            <hr style="border: 0; border-top: 1px dashed #cbd5e1; margin: 1rem 0;">
        </div>
        
        <div style="background: #f8fafc; padding: 1rem; border-radius: 6px; font-size: 0.9rem; margin-bottom: 1.2rem; color:#334155;">
            <p style="margin-bottom:0.3rem;"><strong>Nama Pembeli:</strong> ${name}</p>
            <p style="margin-bottom:0.3rem;"><strong>Alamat:</strong> ${address}</p>
            <p style="margin-bottom:0.5rem;"><strong>Metode Pembayaran:</strong> ${payment}</p>
            <p style="margin-bottom:0.3rem; border-top:1px solid #e2e8f0; padding-top:0.5rem;"><strong>Item yang dibeli:</strong></p>
            <ul style="padding-left: 1.2rem; color: #475569;">
                ${daftarBukuHtml}
            </ul>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; padding:0 0.2rem;">
            <span style="font-weight: bold; font-size: 1rem;">Total Dibayar:</span>
            <span style="font-weight: bold; font-size: 1.2rem; color: #0f766e;">Rp ${total.toLocaleString('id-ID')}</span>
        </div>

        <button class="btn-add" style="background: #0f172a;" onclick="closeModal(); window.location.reload();">Selesai & Tutup</button>
    `;

    modal.style.display = "flex";
    
    // Reset Data Toko
    cart = [];
    updateCart();
    document.getElementById('order-form').reset();
    
    document.getElementById('cart-sidebar').classList.remove('open');
    document.getElementById('cart-overlay').classList.remove('open');
}

// 7. LISTENERS & INIT APP
document.getElementById('cart-btn').addEventListener('click', () => { cartSidebar.classList.add('open'); cartOverlay.classList.add('open'); });
document.getElementById('close-cart').addEventListener('click', () => { cartSidebar.classList.remove('open'); cartOverlay.classList.remove('open'); });

// Jalankan pembacaan data katalog saat halaman pertama kali dibuka
displayBooks(books);
renderCart();