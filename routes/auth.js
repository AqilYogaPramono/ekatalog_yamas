const express = require('express')
const router = express.Router()
// import model pengguna
const modelPengguna = require('../model/modelPengguna')
// import bcrypt
const bcrypt = require('bcryptjs')

// route view register pustakawan
router.get('/dyIZXvc0ER2acma', (req, res) => {
    try {
        res.render('auth/registerPustakawan', {
            data: req.flash('data')[0]
        })
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/')
    }
})

// route post register pustakawan
router.post('/register-pustakawan', async (req, res) => {
    try {
        // destructuring req.body
        const { nama, NP, kata_sandi, konfirmasi_kata_sandi } = req.body

        // menyimpan data yang diinputkan user
        const data = { nama, NP, kata_sandi }

        // input nama tidak boleh kosong
        if (!nama) {
            req.flash('error', 'Nama tidak boleh kosong')
            req.flash('data', data)
            return res.redirect('/dyIZXvc0ER2acma')
        }

        // input NP tidak boleh kosong
        if (!NP) {
            req.flash('error', 'NIP tidak boleh kosong')
            req.flash('data', data)
            return res.redirect('/dyIZXvc0ER2acma')
        }

        // cek NP sudah terdaftar atau belum untuk manajer
        if (await modelPengguna.checkNPManajer(NP)) {
            req.flash('error', 'Nomer Pegawai sudah terdaftar')
            req.flash('data', data)
            return res.redirect('/dyIZXvc0ER2acma')
        }   

        // cek NP sudah terdaftar atau belum untuk pustakawan
        if (await modelPengguna.checkNPPustakawan(NP)) {
            req.flash('error', 'Nomer Pegawai sudah terdaftar')
            req.flash('data', data)
            return res.redirect('/dyIZXvc0ER2acma')
        }

        // input kata_sandi tidak boleh kosong
        if (!kata_sandi) {
            req.flash('error', 'Kata Sandi tidak boleh kosong')
            req.flash('data', data)
            return res.redirect('/dyIZXvc0ER2acma')
        }

        // input konfirmasi_kata_sandi tidak boleh kosong
        if (!konfirmasi_kata_sandi) {
            req.flash('error', 'Konfirmasi Kata Sandi tidak boleh kosong')
            req.flash('data', data)
            return res.redirect('/dyIZXvc0ER2acma')
        }

        // kata sandi minimal 6 karakter
        if (kata_sandi.length < 6) {
            req.flash('error', 'Kata Sandi Minimal 6 karakter')
            req.flash('data', data)
            return res.redirect('/dyIZXvc0ER2acma')
        }

        // kata sandi harus mengandung minimal 1 hurud kapital
        if (!/[A-Z]/.test(kata_sandi)) {
            req.flash('error', 'Kata Sandi Minimal 1 Huruf Kapital')
            req.flash('data', data)
            return res.redirect('/dyIZXvc0ER2acma')
        }

        // kata sandi harus mengandung minimal 1 huruf kecil
        if (!/[a-z]/.test(kata_sandi)) {
            req.flash('error', 'Kata Sandi Minimal 1 Huruf Kecil')
            req.flash('data', data)
            return res.redirect('/dyIZXvc0ER2acma')
        }

        // kata sandi harus mengandung minimal 1 angka
        if (!/\d/.test(kata_sandi)) {
            req.flash('error', 'Kata Sandi Minimal 1 Angka')
            req.flash('data', data)
            return res.redirect('/dyIZXvc0ER2acma')
        }

        // cek kesesuaian kata_sandi dan konfirmasi_kata_sandi
        if (kata_sandi != konfirmasi_kata_sandi) {
            req.flash('error', 'Kata Sandi dan konfirmasi Kata Sandi tidak cocok')
            req.flash('data', data)
            return res.redirect('/dyIZXvc0ER2acma')
        }

        // simpan data ke database
        await modelPengguna.registerPustakawan(data)

        req.flash('success', 'Pendaftaran berhasil, silahkan tunggu Manajer untuk aktivasi akun')
        return res.redirect('/dyIZXvc0ER2acma')
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/')
    }
})

// route view register manajer
router.get('/vdq7vwhBN6TA1THh', (req, res) => {
    try {
        res.render('auth/registerManajer', {
            data: req.flash('data')[0]
        })
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/')
    }
})

// route post register manajer
router.post('/register-manajer', async (req, res) => {
    try {
        
        const { nama, NP, kata_sandi, konfirmasi_kata_sandi } = req.body
        // menyimpan data yang diinputkan user
        const data = { nama, NP, kata_sandi }

        // input nama tidak boleh kosong
        if (!nama) {
            req.flash('error', 'Nama tidak boleh kosong')
            req.flash('data', data)
            return res.redirect('/vdq7vwhBN6TA1THh')
        }

        // input NP tidak boleh kosong
        if (!NP) {
            req.flash('error', 'NIP tidak boleh kosong')
            req.flash('data', data)
            return res.redirect('/vdq7vwhBN6TA1THh')
        }

        // cek NP sudah terdaftar atau belum untuk manajer
        if (await modelPengguna.checkNPManajer(NP)) {
            req.flash('error', 'Nomer Pegawai sudah terdaftar')
            req.flash('data', data)
            return res.redirect('/vdq7vwhBN6TA1THh')
        }

        // cek NP sudah terdaftar atau belum untuk pustakawan
        if (await modelPengguna.checkNPPustakawan(NP)) {
            req.flash('error', 'Nomer Pegawai sudah terdaftar')
            req.flash('data', data)
            return res.redirect('/vdq7vwhBN6TA1THh')
        }

        // input kata_sandi tidak boleh kosong
        if (!kata_sandi) {
            req.flash('error', 'Kata Sandi tidak boleh kosong')
            req.flash('data', data)
            return res.redirect('/vdq7vwhBN6TA1THh')
        }

        // input konfirmasi_kata_sandi tidak boleh kosong
        if (!konfirmasi_kata_sandi) {
            req.flash('error', 'Konfirmasi Kata Sandi tidak boleh kosong')
            req.flash('data', data)
            return res.redirect('/vdq7vwhBN6TA1THh')
        }

        // kata sandi minimal 6 karakter
        if (kata_sandi.length < 6) {
            req.flash('error', 'Kata Sandi Minimal 6 karakter')
            req.flash('data', data)
            return res.redirect('/vdq7vwhBN6TA1THh')
        }

        // kata sandi harus mengandung minimal 1 huruf kapital
        if (!/[A-Z]/.test(kata_sandi)) {
            req.flash('error', 'Kata Sandi Minimal 1 Huruf Kapital')
            req.flash('data', data)
            return res.redirect('/vdq7vwhBN6TA1THh')
        }

        // kata sandi harus mengandung minimal 1 huruf kecil
        if (!/[a-z]/.test(kata_sandi)) {
            req.flash('error', 'Kata Sandi Minimal 1 Huruf Kecil')
            req.flash('data', data)
            return res.redirect('/vdq7vwhBN6TA1THh')
        }

        // kata sandi harus mengandung minimal 1 angka
        if (!/\d/.test(kata_sandi)) {
            req.flash('error', 'Kata Sandi Minimal 1 Angka')
            req.flash('data', data)
            return res.redirect('/vdq7vwhBN6TA1THh')
        }

        // cek kesesuaian kata_sandi dan konfirmasi_kata_sandi
        if (kata_sandi != konfirmasi_kata_sandi) {
            req.flash('error', 'Kata Sandi dan konfirmasi Kata Sandi tidak cocok')
            req.flash('data', data)
            return res.redirect('/vdq7vwhBN6TA1THh')
        }

        // simpan data ke database
        await modelPengguna.registerManajer(data)

        req.flash('success', 'Pendaftaran berhasil, silahkan tunggu Admin untuk aktivasi akun')
        return res.redirect('/vdq7vwhBN6TA1THh')
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/')
    }
})

// router view login pustakawan dan manajer
router.get('/login', (req, res) => {
    try {
        res.render('auth/login', {
            data: req.flash('data')[0]
        })
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/')
    }

})

// router post login pustakawan dan manajer
router.post('/log', async(req, res) => {
    try {
        // destructuring req.body
        const {NP, kata_sandi} = req.body
        // menyimpan data yang diinputkan user
        const data = {NP, kata_sandi}

        // mengecek user yang login dengan NP yang diinputkan 
        const pengguna = await modelPengguna.login(data)

        // mengecek apakah NP yang diinputkan ada
        if (!pengguna) {
            req.flash('error', 'Nomer Pegawai yang anda masukkan salah')
            req.flash('data', data)
            return res.redirect('/login')
        }

        // membandingkan Kata Sandi yang dinputkan dengan pasword yang ada didatabase
        if (!(await bcrypt.compare(kata_sandi, pengguna.kata_sandi))) {
            req.flash('error', 'Kata Sandi yang anda masukkan salah')
            req.flash('data', data)
            return res.redirect('/login')
        }

        // mengecek status akun pengguna, jika belum aktif tidak akan bisa login
        if (pengguna.status_akun != 'Aktif') {
            req.flash('error', 'Status akun belum aktif, Silahkan hubungi Manajer')
            req.flash('data', data)
            return res.redirect('/login')
        }

        // menyimpan id pengguna pada session
        req.session.penggunaId = pengguna.id

        // mengredirect ke dashboard sesuai peran
        if(pengguna.peran == "Pustakawan") return res.redirect('/pustakawan/dashboard')
        if(pengguna.peran == "Manajer") return res.redirect('/manajer/dashboard')
    } catch(err) {
        console.log(err)
        req.flash('error', err.message)
        req.flash('data', data)
        res.redirect('/login')
    }
})

// route logout
router.get('/logout', async(req, res) => {
    req.session.destroy(err => {
        if (err)  {
            req.flash('error', 'Gagal Logout')
        }
        console.log(err)
        res.redirect('/')
    }) 
})

module.exports = router