var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
var session = require('express-session');
var flash = require('express-flash');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
// Middleware login opsi
app.use(session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: true,
    rolling: true,
    cookie: {
        secure: false, // Atur ke true jika menggunakan HTTPS
        maxAge: 600000000
    }
}));

// Middleware untuk mengirim pesan flash
app.use(flash());

// Middleware untuk mengatur 'currentPath' secara global di semua EJS
app.use((req, res, next) => {
    res.locals.currentPath = req.path;
    res.locals.messages = req.flash(); 
    next();
});

// Rute untuk Dashboard
app.get('/dashboard', (req, res) => {
    const totalBuku = 1234;
    const totalMajalah = 567;
    const daftarBuku = []; // Ini harusnya diambil dari database
    const daftarMajalah = []; // Ini harusnya diambil dari database

    res.render('pengurus/admin/dashboard', {
        title: 'Dashboard Admin',
        totalBuku: totalBuku,
        totalMajalah: totalMajalah,
        buku: daftarBuku,
        majalah: daftarMajalah
    });
});

app.get('/', (req, res) => {
    res.redirect('/auth/login'); // Arahkan ke rute login
});

// Rute untuk menampilkan halaman login (GET /auth/login)
app.get('/auth/login', (req, res) => {
    res.render('auth/login', {
        title: 'Login Perpustakaan'
    });
});

//BAHASA
// Rute untuk menampilkan daftar bahasa (GET /pengurus/user/bahasa) 
app.get('/pengurus/user/bahasa', (req, res) => {
    const bahasas = [
        { id: 1, nama: "Indonesia" },
        { id: 2, nama: "Inggris" },
        { id: 3, nama: "Jepang" },
        { id: 4, nama: "Mandarin" },
        { id: 5, nama: "Arab" }
    ];
    res.render('pengurus/user/bahasa/index', {
        title: 'Daftar Bahasa',
        bahasas: bahasas
    });
});

// Rute untuk menampilkan form tambah bahasa (GET /pengurus/user/bahasa/create) 
app.get('/pengurus/user/bahasa/create', (req, res) => {
    res.render('pengurus/user/bahasa/create', { 
        title: 'Tambah Bahasa'
    });
});

// Rute untuk menampilkan form edit bahasa (GET /pengurus/user/bahasa/edit/:id) 
app.get('/pengurus/user/bahasa/edit/:id', (req, res) => {
    const bahasaId = req.params.id;
    const bahasaToEdit = { id: bahasaId, nama: `Bahasa ID ${bahasaId} (Contoh)` };
    res.render('pengurus/user/bahasa/edit', {
        title: 'Edit Bahasa',
        bahasa: bahasaToEdit
    });
});

//  RUTE UNTUK PENERBIT MAJALAH 

// Rute untuk menampilkan daftar penerbit majalah (GET /pengurus/user/majalah/penerbit) 
app.get('/pengurus/user/majalah/penerbit', (req, res) => {
    const penerbitmajalah = [
        { id: 1, nama: "Tempo" },
        { id: 2, nama: "Liberty" },
    ];
    res.render('pengurus/user/majalah/penerbitMajalah/index', { 
        title: 'Daftar Penerbit Majalah',
        penerbitmajalah: penerbitmajalah
    });
});

// Rute untuk menampilkan form tambah penerbit majalah (GET pengurus/user/majalah/penerbit/create) 
app.get('/pengurus/user/majalah/penerbit/create', (req, res) => {
    res.render('pengurus/user/majalah/penerbitMajalah/create', { 
        title: 'Tambah Penerbit Majalah'
    });
});

// Rute untuk menampilkan form edit penerbit majalah (GET /pengurus/user/majalah/penerbit/edit/:id) 
app.get('/pengurus/user/majalah/penerbit/edit/:id', (req, res) => {
    const penerbitmajalahId = req.params.id;
    const penerbitmajalahToEdit = { id: penerbitmajalahId, nama: `Penerbit Majalah ID ${penerbitmajalahId} (Contoh)` };
    res.render('pengurus/user/majalah/penerbitMajalah/edit', { 
        title: 'Edit Penerbit Majalah',
        penerbitmajalah: penerbitmajalahToEdit
    });
});

// Rute untuk MENGHANDEL SUBMIT FORM EDIT PENERBIT MAJALAH (POST request)
app.post('/pengurus/user/majalah/penerbit/edit/:id', (req, res) => {
    const penerbitId = req.params.id;
    const newNamaPenerbit = req.body.nama; 

    console.log(`Simulasi: Penerbit Majalah ID ${penerbitId} berhasil diupdate menjadi: ${newNamaPenerbit}`);
    res.redirect(`/pengurus/user/majalah/penerbit?updated=${encodeURIComponent(newNamaPenerbit)}`);
});

// Rute untuk MENGHANDEL PENGHAPUSAN PENERBIT MAJALAH (POST request)
app.post('/pengurus/user/majalah/penerbit/delete/:id', (req, res) => {
    const penerbitId = req.params.id;
    const namaPenerbitDihapus = "Penerbit yang Dihapus (Contoh)"; 

    console.log(`Simulasi: Penerbit Majalah ID ${penerbitId} (${namaPenerbitDihapus}) akan dihapus.`);
    res.redirect(`/pengurus/user/majalah/penerbit?deleted=${encodeURIComponent(namaPenerbitDihapus)}`);
});

//  RUTE UNTUK TEMPAT TERBIT MAJALAH 

// Rute untuk menampilkan daftar tempat terbit majalah (GET /pengurus/user/majalah/tempatTerbitMajalah) 
app.get('/pengurus/user/majalah/tempatTerbitMajalah', (req, res) => {
    const tempatTerbitMajalahs = [ 
        { id: 1, nama: "Jakarta" },
        { id: 2, nama: "Surabaya" }, 
        { id: 3, nama: "Medan" }
    ];
    res.render('pengurus/user/majalah/tempatTerbitMajalah/index', { 
        title: 'Daftar Tempat Terbit Majalah',
        tempatTerbitMajalahs: tempatTerbitMajalahs 
    });
});

// Rute untuk menampilkan form tambah tempat terbit majalah (GET /pengurus/user/majalah/tempatTerbitMajalah/create) 
app.get('/pengurus/user/majalah/tempatTerbitMajalah/create', (req, res) => {
    res.render('pengurus/user/majalah/tempatTerbitMajalah/create', { 
        title: 'Tambah Tempat Terbit Majalah'
    });
});

// Rute untuk MENGHANDEL SUBMIT FORM TAMBAH TEMPAT TERBIT MAJALAH (POST request)
app.post('/pengurus/user/majalah/tempatTerbitMajalah/create', (req, res) => {
    const newTempatTerbit = req.body.nama;

    console.log(`Simulasi: Tempat terbit majalah baru "${newTempatTerbit}" berhasil ditambahkan.`);
    // Di sini Anda akan menyimpan data ke database
    res.redirect(`/pengurus/user/majalah/tempatTerbitMajalah?created=${encodeURIComponent(newTempatTerbit)}`);
});

// Rute untuk menampilkan form edit tempat terbit majalah (GET /pengurus/user/majalah/tempatTerbitMajalah/edit/:id) 
app.get('/pengurus/user/majalah/tempatTerbitMajalah/edit/:id', (req, res) => {
    const tempatTerbitId = req.params.id;
    const tempatTerbitToEdit = { id: tempatTerbitId, nama: `Tempat Terbit Majalah ID ${tempatTerbitId} (Contoh)` };
    res.render('pengurus/user/majalah/tempatTerbitMajalah/edit', { 
        title: 'Edit Tempat Terbit Majalah',
        tempatTerbit: tempatTerbitToEdit
    });
});

// Rute untuk MENGHANDEL SUBMIT FORM EDIT TEMPAT TERBIT MAJALAH (POST request)
app.post('/pengurus/user/majalah/tempatTerbitMajalah/edit/:id', (req, res) => {
    const tempatTerbitId = req.params.id;
    const newTempatTerbit = req.body.nama; 

    console.log(`Simulasi: Tempat Terbit Majalah ID ${tempatTerbitId} berhasil diupdate menjadi: ${newTempatTerbit}`);
    res.redirect(`/pengurus/user/majalah/tempatTerbitMajalah?updated=${encodeURIComponent(newTempatTerbit)}`);
});

// Rute untuk MENGHANDEL PENGHAPUSAN TEMPAT TERBIT MAJALAH (POST request)
app.post('/pengurus/user/majalah/tempatTerbitMajalah/delete/:id', (req, res) => {
    const tempatTerbitId = req.params.id;
    const namaTempatTerbitDihapus = "Tempat Terbit Majalah yang Dihapus (Contoh)"; 

    console.log(`Simulasi: Tempat Terbit Majalah ID ${tempatTerbitId} (${namaTempatTerbitDihapus}) akan dihapus.`);
    res.redirect(`/pengurus/user/majalah/tempatTerbitMajalah?deleted=${encodeURIComponent(namaTempatTerbitDihapus)}`);
});


//  RUTE UNTUK PENERBIT BUKU 

// Rute untuk menampilkan daftar penerbit buku (GET /pengurus/user/buku/penerbit) 
app.get('/pengurus/user/buku/penerbit', (req, res) => {
    const penerbitbuku = [
        { id: 1, nama: "Gramedia" },
        { id: 2, nama: "Matabangsa" },
    ];
    res.render('pengurus/user/buku/penerbitBuku/index', { 
        title: 'Daftar Penerbit Buku',
        penerbitbuku: penerbitbuku
    });
});

// Rute untuk menampilkan form tambah penerbit buku (GET /pengurus/user/buku/penerbit/create) 
app.get('/pengurus/user/buku/penerbit/create', (req, res) => {
    res.render('pengurus/user/buku/penerbitBuku/create', { 
        title: 'Tambah Penerbit Buku'
    });
});

// Rute untuk MENGHANDEL SUBMIT FORM TAMBAH PENERBIT BUKU (POST request)
app.post('/pengurus/user/buku/penerbit/create', (req, res) => {
    const newNamaPenerbit = req.body.nama; 

    console.log(`Simulasi: Penerbit baru "${newNamaPenerbit}" berhasil ditambahkan.`);
    res.redirect(`/pengurus/user/buku/penerbit?created=${encodeURIComponent(newNamaPenerbit)}`);
});

// Rute untuk menampilkan form edit penerbit buku (GET /pengurus/user/buku/penerbit/edit/:id) 
app.get('/pengurus/user/buku/penerbit/edit/:id', (req, res) => {
    const penerbitbukuId = req.params.id;
    const penerbitbukuToEdit = { id: penerbitbukuId, nama: `Penerbit Buku ID ${penerbitbukuId} (Contoh)` };
    res.render('pengurus/user/buku/penerbitBuku/edit', { 
        title: 'Edit Penerbit Buku',
        penerbitbuku: penerbitbukuToEdit
    });
});

// Rute untuk MENGHANDEL SUBMIT FORM EDIT PENERBIT BUKU (POST request)
app.post('/pengurus/user/buku/penerbit/edit/:id', (req, res) => {
    const penerbitId = req.params.id;
    const newNamaPenerbit = req.body.nama; 

    console.log(`Simulasi: Penerbit ID ${penerbitId} berhasil diupdate menjadi: ${newNamaPenerbit}`);
    res.redirect(`/pengurus/user/buku/penerbit?updated=${encodeURIComponent(newNamaPenerbit)}`);
});

// Rute untuk MENGHANDEL PENGHAPUSAN PENERBIT BUKU (POST request)
app.post('/pengurus/user/buku/penerbit/delete/:id', (req, res) => {
    const penerbitId = req.params.id;
    const namaPenerbitDihapus = "Penerbit yang Dihapus (Contoh)"; 

    console.log(`Simulasi: Penerbit Buku ID ${penerbitId} (${namaPenerbitDihapus}) akan dihapus.`);
    res.redirect(`/pengurus/user/buku/penerbit?deleted=${encodeURIComponent(namaPenerbitDihapus)}`);
});

//  RUTE UNTUK TEMPAT TERBIT BUKU 

// Rute untuk menampilkan daftar tempat terbit buku (GET /pengurus/user/buku/tempat-terbit) 
app.get('/pengurus/user/buku/tempat-terbit', (req, res) => {
    const tempatTerbitBukus = [
        { id: 1, nama: "Jakarta" },
        { id: 2, nama: "Bandung" },
        { id: 3, nama: "Yogyakarta" }
    ];
    res.render('pengurus/user/buku/tempatTerbitBuku/index', { 
        title: 'Daftar Tempat Terbit Buku',
        tempatTerbitBukus: tempatTerbitBukus
    });
});

// Rute untuk menampilkan form tambah tempat terbit buku (GET /pengurus/user/buku/tempat-terbit/create) 
app.get('/pengurus/user/buku/tempat-terbit/create', (req, res) => {
    res.render('pengurus/user/buku/tempatTerbitBuku/create', { 
        title: 'Tambah Tempat Terbit Buku'
    });
});

// Rute untuk MENGHANDEL SUBMIT FORM TAMBAH TEMPAT TERBIT BUKU (POST request)
app.post('/pengurus/user/buku/tempat-terbit/create', (req, res) => {
    const newTempatTerbit = req.body.nama;

    console.log(`Simulasi: Tempat terbit baru "${newTempatTerbit}" berhasil ditambahkan.`);
    res.redirect(`/pengurus/user/buku/tempat-terbit?created=${encodeURIComponent(newTempatTerbit)}`);
});

// Rute untuk menampilkan form edit tempat terbit buku (GET /pengurus/user/buku/tempat-terbit/edit/:id) 
app.get('/pengurus/user/buku/tempat-terbit/edit/:id', (req, res) => {
    const tempatTerbitId = req.params.id;
    const tempatTerbitToEdit = { id: tempatTerbitId, nama: `Tempat Terbit ID ${tempatTerbitId} (Contoh)` };
    res.render('pengurus/user/buku/tempatTerbitBuku/edit', { 
        title: 'Edit Tempat Terbit Buku',
        tempatTerbit: tempatTerbitToEdit
    });
});

// Rute untuk MENGHANDEL SUBMIT FORM EDIT TEMPAT TERBIT BUKU (POST request)
app.post('/pengurus/user/buku/tempat-terbit/edit/:id', (req, res) => {
    const tempatTerbitId = req.params.id;
    const newTempatTerbit = req.body.nama; 

    console.log(`Simulasi: Tempat Terbit ID ${tempatTerbitId} berhasil diupdate menjadi: ${newTempatTerbit}`);
    res.redirect(`/pengurus/user/buku/tempat-terbit?updated=${encodeURIComponent(newTempatTerbit)}`);
});

// Rute untuk MENGHANDEL PENGHAPUSAN TEMPAT TERBIT BUKU (POST request)
app.post('/pengurus/user/buku/tempat-terbit/delete/:id', (req, res) => {
    const tempatTerbitId = req.params.id;
    const namaTempatTerbitDihapus = "Tempat Terbit yang Dihapus (Contoh)"; 

    console.log(`Simulasi: Tempat Terbit ID ${tempatTerbitId} (${namaTempatTerbitDihapus}) akan dihapus.`);
    res.redirect(`/pengurus/user/buku/tempat-terbit?deleted=${encodeURIComponent(namaTempatTerbitDihapus)}`);
});

// Rute untuk Logout
app.get('/logout', (req, res) => {
    res.render('auth/login'); 
});

// Rute untuk menangani login (POST request dari form login)
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin@example.com' && password === 'password123') {
        console.log('Login berhasil untuk:', username);
        res.redirect('/dashboard'); 
    } else {
        console.log('Login gagal untuk:', username);
        req.flash('error', 'Username atau password salah.'); 
        res.redirect('/auth/login'); //  kembali ke halaman login
    }
});

//  RUTE UNTUK LOKASI LANTAI 

    // Rute untuk menampilkan dftar lantai (GET /pengurus/user/lokasi/lantai) 
    app.get('/pengurus/user/lokasi/lantai', (req, res) => {
        const lantai = [
            { id: 1, nama: "Lantai 1" },
            { id: 2, nama: "Lantai 2" },
            { id: 3, nama: "Lantai 3" }
        ];
        res.render('pengurus/user/lokasi/lantai/index', { 
            title: 'Daftar Lantai',
            lantai: lantai
        });
    });

    // Rute untuk menampilkan form tambah lantai (GET /pengurus/user/lokasi/lantai/create) 
    app.get('/pengurus/user/lokasi/lantai/create', (req, res) => {
        res.render('pengurus/user/lokasi/lantai/create', { 
            title: 'Tambah Lantai'
        });
    });

    // Rute untuk MENGHANDEL SUBMIT FORM TAMBAH LANTAI (POST request)
    app.post('/pengurus/user/lokasi/lantai/create', (req, res) => {
        const newLantai = req.body.nama;

        console.log(`Simulasi: Lantai baru "${newLantai}" berhasil ditambahkan.`);
        res.redirect(`/pengurus/user/lokasi/lantai?created=${encodeURIComponent(newLantai)}`);
    });

    // Rute untuk menampilkan form edit lantai (GET /pengurus/user/lokasi/lantai/edit/:id) 
    app.get('/pengurus/user/lokasi/lantai/edit/:id', (req, res) => {
        const lantaiId = req.params.id;
        const lantaiToEdit = { id: lantaiId, nama: `Lantai ID ${lantaiId} (Contoh)` };
        res.render('pengurus/user/lokasi/lantai/edit', { 
            title: 'Edit Lantai',
            lantai: lantaiToEdit
        });
    });

    // Rute untuk MENGHANDEL SUBMIT FORM EDIT LANTAI (POST request)
    app.post('/pengurus/user/lokasi/lantai/edit/:id', (req, res) => {
        const lantaiId = req.params.id;
        const newLantai = req.body.nama; 

        console.log(`Simulasi: Lantai ID ${lantaiId} berhasil diupdate menjadi: ${newLantai}`);
        res.redirect(`/pengurus/user/lokasi/lantai?updated=${encodeURIComponent(newLantai)}`);
    });

    // Rute untuk MENGHANDEL PENGHAPUSAN LANTAI (POST request)
    app.post('/pengurus/user/lokasi/lantai/delete/:id', (req, res) => {
        const lantaiId = req.params.id;
        const namaLantaiDihapus = "Lantai yang Dihapus (Contoh)"; 

        console.log(`Simulasi: Lantai ID ${lantaiId} (${namaLantaiDihapus}) akan dihapus.`);
        res.redirect(`/pengurus/user/lokasi/lantai?deleted=${encodeURIComponent(namaLantaiDihapus)}`);
    });
   

    //  RUTE UNTUK RAK
    // Rute untuk menampilkan daftar rak (GET /pengurus/user/lokasi/rak) 
    app.get('/pengurus/user/lokasi/rak', (req, res) => {
        const rak = [
            { id: 1, nama: "Rak A1" },
            { id: 2, nama: "Rak B2" },
            { id: 3, nama: "Rak C3" }
        ];
        res.render('pengurus/user/lokasi/rak/index', { 
            title: 'Daftar Rak',
            rak: rak
        });
    });

    // Rute untuk menampilkan form tambah rak (GET /pengurus/user/lokasi/rak/create) 
    app.get('/pengurus/user/lokasi/rak/create', (req, res) => {
        res.render('pengurus/user/lokasi/rak/create', { 
            title: 'Tambah Rak'
        });
    });

    // Rute untuk MENGHANDEL SUBMIT FORM TAMBAH RAK (POST request)
    app.post('/pengurus/user/lokasi/rak/create', (req, res) => {
        const newRak = req.body.nama;

        console.log(`Simulasi: Rak baru "${newRak}" berhasil ditambahkan.`);
        res.redirect(`/pengurus/user/lokasi/rak?created=${encodeURIComponent(newRak)}`);
    });

    // Rute untuk menampilkan form edit rak (GET /pengurus/user/lokasi/rak/edit/:id) 
    app.get('/pengurus/user/lokasi/rak/edit/:id', (req, res) => {
        const rakId = req.params.id;
        const rakToEdit = { id: rakId, nama: `Rak ID ${rakId} (Contoh)` };
        res.render('pengurus/user/lokasi/rak/edit', { 
            title: 'Edit Rak',
            rak: rakToEdit
        });
    });

    // Rute untuk MENGHANDEL SUBMIT FORM EDIT RAK (POST request)
    app.post('/pengurus/user/lokasi/rak/edit/:id', (req, res) => {
        const rakId = req.params.id;
        const newRak = req.body.nama; 

        console.log(`Simulasi: Rak ID ${rakId} berhasil diupdate menjadi: ${newRak}`);
        res.redirect(`/pengurus/user/lokasi/rak?updated=${encodeURIComponent(newRak)}`);
    });

    // Rute untuk MENGHANDEL PENGHAPUSAN RAK (POST request)
    app.post('/pengurus/user/lokasi/rak/delete/:id', (req, res) => {
        const rakId = req.params.id;
        const namaRakDihapus = "Rak yang Dihapus (Contoh)"; 

        console.log(`Simulasi: Rak ID ${rakId} (${namaRakDihapus}) akan dihapus.`);
        res.redirect(`/pengurus/user/lokasi/rak?deleted=${encodeURIComponent(namaRakDihapus)}`);
    });

//  RUTE UNTUK RAK
    // Rute untuk menampilkan daftar rak (GET /pengurus/user/lokasi/rak) 
    app.get('/pengurus/user/lokasi/rak', (req, res) => {
        const rak = [
            { id: 1, nama: "Rak A1" },
            { id: 2, nama: "Rak B2" },
            { id: 3, nama: "Rak C3" }
        ];
        res.render('pengurus/user/lokasi/rak/index', { 
            title: 'Daftar Rak',
            rak: rak
        });
    });

    // Rute untuk menampilkan form tambah rak (GET /pengurus/user/lokasi/rak/create) 
    app.get('/pengurus/user/lokasi/rak/create', (req, res) => {
        res.render('pengurus/user/lokasi/rak/create', { 
            title: 'Tambah Rak'
        });
    });

    // Rute untuk MENGHANDEL SUBMIT FORM TAMBAH RAK (POST request)
    app.post('/pengurus/user/lokasi/rak/create', (req, res) => {
        const newRak = req.body.nama;

        console.log(`Simulasi: Rak baru "${newRak}" berhasil ditambahkan.`);
        res.redirect(`/pengurus/user/lokasi/rak?created=${encodeURIComponent(newRak)}`);
    });

    // Rute untuk menampilkan form edit rak (GET /pengurus/user/lokasi/rak/edit/:id) 
    app.get('/pengurus/user/lokasi/rak/edit/:id', (req, res) => {
        const rakId = req.params.id;
        const rakToEdit = { id: rakId, nama: `Rak ID ${rakId} (Contoh)` };
        res.render('pengurus/user/lokasi/rak/edit', { 
            title: 'Edit Rak',
            rak: rakToEdit
        });
    });

    // Rute untuk MENGHANDEL SUBMIT FORM EDIT RAK (POST request)
    app.post('/pengurus/user/lokasi/rak/edit/:id', (req, res) => {
        const rakId = req.params.id;
        const newRak = req.body.nama; 

        console.log(`Simulasi: Rak ID ${rakId} berhasil diupdate menjadi: ${newRak}`);
        res.redirect(`/pengurus/user/lokasi/rak?updated=${encodeURIComponent(newRak)}`);
    });

    // Rute untuk MENGHANDEL PENGHAPUSAN RAK (POST request)
    app.post('/pengurus/user/lokasi/rak/delete/:id', (req, res) => {
        const rakId = req.params.id;
        const namaRakDihapus = "Rak yang Dihapus (Contoh)"; 

        console.log(`Simulasi: Rak ID ${rakId} (${namaRakDihapus}) akan dihapus.`);
        res.redirect(`/pengurus/user/lokasi/rak?deleted=${encodeURIComponent(namaRakDihapus)}`);
    });


    //  RUTE UNTUK LOKASI 

    // Rute untuk menampilkan daftar lantai (GET /pengurus/user/lokasi/lantai) 
    app.get('/pengurus/user/lokasi/lantai', (req, res) => {
        const lantai = [
            { id: 1, nama: "Lantai 1" },
            { id: 2, nama: "Lantai 2" },
            { id: 3, nama: "Lantai 3" }
        ];
        res.render('pengurus/user/lokasi/lantai/index', { 
            title: 'Daftar Lantai',
            lantai: lantai
        });
    });

    // Rute untuk menampilkan form tambah lantai (GET /pengurus/user/lokasi/lantai/create) 
    app.get('/pengurus/user/lokasi/lantai/create', (req, res) => {
        res.render('pengurus/user/lokasi/lantai/create', { 
            title: 'Tambah Lantai'
        });
    });

    // Rute untuk MENGHANDEL SUBMIT FORM TAMBAH LANTAI (POST request)
    app.post('/pengurus/user/lokasi/lantai/create', (req, res) => {
        const newLantai = req.body.nama;

        console.log(`Simulasi: Lantai baru "${newLantai}" berhasil ditambahkan.`);
        res.redirect(`/pengurus/user/lokasi/lantai?created=${encodeURIComponent(newLantai)}`);
    });

    // Rute untuk menampilkan form edit lantai (GET /pengurus/user/lokasi/lantai/edit/:id) 
    app.get('/pengurus/user/lokasi/lantai/edit/:id', (req, res) => {
        const lantaiId = req.params.id;
        const lantaiToEdit = { id: lantaiId, nama: `Lantai ID ${lantaiId} (Contoh)` };
        res.render('pengurus/user/lokasi/lantai/edit', { 
            title: 'Edit Lantai',
            lantai: lantaiToEdit
        });
    });

    // Rute untuk MENGHANDEL SUBMIT FORM EDIT LANTAI (POST request)
    app.post('/pengurus/user/lokasi/lantai/edit/:id', (req, res) => {
        const lantaiId = req.params.id;
        const newLantai = req.body.nama; 

        console.log(`Simulasi: Lantai ID ${lantaiId} berhasil diupdate menjadi: ${newLantai}`);
        res.redirect(`/pengurus/user/lokasi/lantai?updated=${encodeURIComponent(newLantai)}`);
    });

    // Rute untuk MENGHANDEL PENGHAPUSAN LANTAI (POST request)
    app.post('/pengurus/user/lokasi/lantai/delete/:id', (req, res) => {
        const lantaiId = req.params.id;
        const namaLantaiDihapus = "Lantai yang Dihapus (Contoh)"; 

        console.log(`Simulasi: Lantai ID ${lantaiId} (${namaLantaiDihapus}) akan dihapus.`);
        res.redirect(`/pengurus/user/lokasi/lantai?deleted=${encodeURIComponent(namaLantaiDihapus)}`);
    });

    
    //  RUTE UNTUK RUANGAN  
    app.get('/pengurus/user/lokasi/ruangan', (req, res) => {
        const ruangan = [
            { id: 1, nama: "Ruangan Koleksi Khusu" },
            { id: 2, nama: "Ruangan Koleksi Langka" }
        ];
        res.render('pengurus/user/lokasi/ruangan/index', { 
            title: 'Daftar Ruangan',
            ruangan: ruangan
        });
    });

    app.get('/pengurus/user/lokasi/ruangan/create', (req, res) => {
        res.render('pengurus/user/lokasi/ruangan/create', { 
            title: 'Tambah Ruangan'
        });
    });

    app.post('/pengurus/user/lokasi/ruangan/create', (req, res) => {
        const newRuangan = req.body.nama;

        console.log(`Simulasi: Ruangan baru "${newRuangan}" berhasil ditambahkan.`);
        res.redirect(`/pengurus/user/lokasi/ruangan?created=${encodeURIComponent(newRuangan)}`);
    });

    app.get('/pengurus/user/lokasi/ruangan/edit/:id', (req, res) => {
        const ruanganId = req.params.id;
        const ruanganToEdit = { id: ruanganId, nama: `Ruangan ID ${ruanganId} (Contoh)` };
        res.render('pengurus/user/lokasi/ruangan/edit', { 
            title: 'Edit Ruangan',
            ruangan: ruanganToEdit
        });
    });

    app.post('/pengurus/user/lokasi/ruangan/edit/:id', (req, res) => {
        const ruanganId = req.params.id;
        const newRuangan = req.body.nama; 

        console.log(`Simulasi: Ruangan ID ${ruanganId} berhasil diupdate menjadi: ${newRuangan}`);
        res.redirect(`/pengurus/user/lokasi/ruangan?updated=${encodeURIComponent(newRuangan)}`);
    });

    app.post('/pengurus/user/lokasi/ruangan/delete/:id', (req, res) => {
        const ruanganId = req.params.id;
        const namaRuanganDihapus = "Ruangan yang Dihapus (Contoh)"; 

        console.log(`Simulasi: Ruangan ID ${ruanganId} (${namaRuanganDihapus}) akan dihapus.`);
        res.redirect(`/pengurus/user/lokasi/ruangan?deleted=${encodeURIComponent(namaRuanganDihapus)}`);
    });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
