const express = require('express')
const router = express.Router()
const modelPengguna = require('../model/modelPengguna')
const bcrypt = require('bcryptjs')

router.get('/dyIZXvc0ER2acma', (req, res) => {
    res.render('auth/registerPustakawan', {
        data: req.flash('data')[0]
    })
})

router.post('/register-pustakawan', async (req, res) => {
    try {
        const { nama, NP, kata_sandi, konfirmasi_kata_sandi } = req.body
        const data = { nama, NP, kata_sandi }

        if (!nama) {
            req.flash('error', 'Nama tidak boleh kosong')
            req.flash('data', data)
            return res.redirect('/dyIZXvc0ER2acma')
        }

        if (!NP) {
            req.flash('error', 'NIP tidak boleh kosong')
            req.flash('data', data)
            return res.redirect('/dyIZXvc0ER2acma')
        }

        if (await modelPengguna.checkNPPustakawan(NP)) {
            req.flash('error', 'Nomer Pegawai sudah terdaftar')
            req.flash('data', data)
            return res.redirect('/dyIZXvc0ER2acma')
        }

        if (!kata_sandi) {
            req.flash('error', 'Password tidak boleh kosong')
            req.flash('data', data)
            return res.redirect('/dyIZXvc0ER2acma')
        }

        if (!konfirmasi_kata_sandi) {
            req.flash('error', 'Konfirmasi Password tidak boleh kosong')
            req.flash('data', data)
            return res.redirect('/dyIZXvc0ER2acma')
        }

        if (kata_sandi.length < 6) {
            req.flash('error', 'Password Minimal 6 karakter')
            req.flash('data', data)
            return res.redirect('/dyIZXvc0ER2acma')
        }
        if (!/[A-Z]/.test(kata_sandi)) {
            req.flash('error', 'Password Minimal 1 Huruf Kapital')
            req.flash('data', data)
            return res.redirect('/dyIZXvc0ER2acma')
        }
        if (!/[a-z]/.test(kata_sandi)) {
            req.flash('error', 'Password Minimal 1 Huruf Kecil')
            req.flash('data', data)
            return res.redirect('/dyIZXvc0ER2acma')
        }
        if (!/\d/.test(kata_sandi)) {
            req.flash('error', 'Password Minimal 1 Angka')
            req.flash('data', data)
            return res.redirect('/dyIZXvc0ER2acma')
        }

        if (kata_sandi != konfirmasi_kata_sandi) {
            req.flash('error', 'Password dan konfirmasi password tidak cocok')
            req.flash('data', data)
            return res.redirect('/dyIZXvc0ER2acma')
        }

        await modelPengguna.registerPustakawan(data)

        req.flash('success', 'Pendaftaran berhasil, silahkan tunggu Manajer untuk aktivasi akun')
        return res.redirect('/dyIZXvc0ER2acma')
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/')
    }
})

router.get('/vdq7vwhBN6TA1THh', (req, res) => {
    res.render('auth/registerManajer', {
        data: req.flash('data')[0]
    })
})

router.post('/register-manajer', async (req, res) => {
    try {
        const { nama, NP, kata_sandi, konfirmasi_kata_sandi } = req.body
        const data = { nama, NP, kata_sandi }

        if (!nama) {
            req.flash('error', 'Nama tidak boleh kosong')
            req.flash('data', data)
            return res.redirect('/vdq7vwhBN6TA1THh')
        }

        if (!NP) {
            req.flash('error', 'NIP tidak boleh kosong')
            req.flash('data', data)
            return res.redirect('/vdq7vwhBN6TA1THh')
        }

        if (await modelPengguna.checkNPManajer(NP)) {
            req.flash('error', 'Nomer Pegawai sudah terdaftar')
            req.flash('data', data)
            return res.redirect('/vdq7vwhBN6TA1THh')
        }

        if (!kata_sandi) {
            req.flash('error', 'Password tidak boleh kosong')
            req.flash('data', data)
            return res.redirect('/vdq7vwhBN6TA1THh')
        }

        if (!konfirmasi_kata_sandi) {
            req.flash('error', 'Konfirmasi Password tidak boleh kosong')
            req.flash('data', data)
            return res.redirect('/vdq7vwhBN6TA1THh')
        }

        if (kata_sandi.length < 6) {
            req.flash('error', 'Password Minimal 6 karakter')
            req.flash('data', data)
            return res.redirect('/vdq7vwhBN6TA1THh')
        }
        if (!/[A-Z]/.test(kata_sandi)) {
            req.flash('error', 'Password Minimal 1 Huruf Kapital')
            req.flash('data', data)
            return res.redirect('/vdq7vwhBN6TA1THh')
        }
        if (!/[a-z]/.test(kata_sandi)) {
            req.flash('error', 'Password Minimal 1 Huruf Kecil')
            req.flash('data', data)
            return res.redirect('/vdq7vwhBN6TA1THh')
        }
        if (!/\d/.test(kata_sandi)) {
            req.flash('error', 'Password Minimal 1 Angka')
            req.flash('data', data)
            return res.redirect('/vdq7vwhBN6TA1THh')
        }

        if (kata_sandi != konfirmasi_kata_sandi) {
            req.flash('error', 'Password dan konfirmasi password tidak cocok')
            req.flash('data', data)
            return res.redirect('/vdq7vwhBN6TA1THh')
        }

        await modelPengguna.registerManajer(data)

        req.flash('success', 'Pendaftaran berhasil, silahkan tunggu Admin untuk aktivasi akun')
        return res.redirect('/vdq7vwhBN6TA1THh')
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/')
    }
})

router.get('/login', (req, res) => {
    res.render('auth/login', {
        data: req.flash('data')[0]
    })
})

router.post('/log', async(req, res) => {
    try {
        const {NP, kata_sandi} = req.body
        const data = {NP, kata_sandi}

        const pengguna = await modelPengguna.login(data)

        if (!pengguna) {
            req.flash('error', 'Nomer Pegawai yang anda masukkan salah')
            req.flash('data', data)
            return res.redirect('/login')
        }

        if (!(await bcrypt.compare(kata_sandi, pengguna.kata_sandi))) {
            req.flash('error', 'Kata Sandi yang anda masukkan salah')
            req.flash('data', data)
            return res.redirect('/login')
        }

        if (pengguna.status_akun != 'Aktif') {
            req.flash('error', 'Status akun belum aktif, Silahkan hubungi Manajer')
            req.flash('data', data)
            return res.redirect('/login')
        }

        req.session.penggunaId = pengguna.id
        req.flash('success', 'Selamat Datang')

        if(pengguna.peran == "Pustakawan") return res.redirect('/pustakawan/dashboard')
        if(pengguna.peran == "Manajer") return res.redirect('/manajer/dashboard')
    } catch(err) {
        req.flash('error', err.message)
        req.flash('data', data)
        res.redirect('/login')
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