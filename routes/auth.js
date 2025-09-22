const express = require('express')
const router = express.Router()
const modelPengurus = require('../model/modelPengurus')
const bcrypt = require('bcryptjs')

router.get('/dyIZXvc0ER2acma', (req, res) => {
    res.render('auth/register')
})

router.post('/register', async (req, res) => {
    try {
        const { nama, email, kata_sandi, konfirmasi_kata_sandi } = req.body

        if (!nama) {
            req.flash('error', 'Nama tidak boleh kosong')
            return res.redirect('/dyIZXvc0ER2acma')
        }

        if (!email) {
            req.flash('error', 'Email tidak boleh kosong')
            return res.redirect('/dyIZXvc0ER2acma')
        }

        if (await modelPengurus.checkEmail(email)) {
            req.flash('error', 'Email sudah terdaftar')
            return res.redirect('/dyIZXvc0ER2acma')
        }

        if (!kata_sandi) {
            req.flash('error', 'Password tidak boleh kosong')
            return res.redirect('/dyIZXvc0ER2acma')
        }

        if (!konfirmasi_kata_sandi) {
            req.flash('error', 'Konfirmasi Password tidak boleh kosong')
            return res.redirect('/dyIZXvc0ER2acma')
        }

        if (kata_sandi.length < 6) {
            req.flash('error', 'Password Minimal 6 karakter')
            return res.redirect('/dyIZXvc0ER2acma')
        }
        if (!/[A-Z]/.test(kata_sandi)) {
            req.flash('error', 'Password Minimal 1 Huruf Kapital')
            return res.redirect('/dyIZXvc0ER2acma')
        }
        if (!/[a-z]/.test(kata_sandi)) {
            req.flash('error', 'Password Minimal 1 Huruf Kecil')
            return res.redirect('/dyIZXvc0ER2acma')
        }
        if (!/\d/.test(kata_sandi)) {
            req.flash('error', 'Password Minimal 1 Angka')
            return res.redirect('/dyIZXvc0ER2acma')
        }

        if (kata_sandi != konfirmasi_kata_sandi) {
            req.flash('error', 'Password dan konfirmasi password tidak cocok')
            return res.redirect('/dyIZXvc0ER2acma')
        }

        const data = { nama, email, kata_sandi }

        await modelPengurus.register(data)

        req.flash('success', 'Pendaftaran berhasil, silahkan tunggu aktivasi akun dari admin')
        res.redirect('/login')
    } catch (err) {
        req.flash('error', err.message)
        res.redirect('/')
    }
})

router.get('/login', (req, res) => {
    res.render('auth/login')
})

router.post('/log', async(req, res) => {
    try {
        const {email, kata_sandi} = req.body
        const data = {email, kata_sandi}

        const pengurus = await modelPengurus.login(data)

        if (!pengurus) {
            req.flash('error', 'Email yang anda masukkan salah')
            return res.redirect('/login')
        }

        if (!(await bcrypt.compare(kata_sandi, pengurus.kata_sandi))) {
            req.flash('error', 'Kata Sandi yang anda masukkan salah')
            return res.redirect('/login')
        }

        if (pengurus.status_akun != 'Aktif') {
            req.flash('error', 'Status akun belum aktif, Silahkan hubungi admin')
            return res.redirect('/login')
        }

        req.session.pengurusId = pengurus.id
        if(pengurus.peran == "Pengurus") return res.redirect('/pengurus/dashboard')
        if(pengurus.peran == "Admin") return res.redirect('/admin/dashboard')
        req.flash('success', 'Selamat Datang')
    } catch(err) {
        req.flash('error', err.message)
        res.redirect('/')
    }
})

router.get('/logout', async(req, res) => {
    req.session.destroy(err => {
        if (err)  {
            req.flash('error', 'Gagal Logout')
        }
        res.redirect('/')
    }) 
})

module.exports = router