const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const modelPengguna = require('../../../model/modelPengguna')
const {authPustakawan} = require('../../../middleware/auth')

router.get('/ubah-kata-sandi', authPustakawan, async (req, res) => {
    try {
        // mendapatkan id pengguna dari session
        const userId = req.session.penggunaId
        const user = await modelPengguna.getNamaPenggunaById(userId)

        res.render('pengurus/pustakawan/pustakawan/ubahKataSandi', { 
            user,
            data: req.flash('data')[0]
        })
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/pustakawan/dashboard')
    }

})

router.post('/change-password', authPustakawan, async (req, res) => {
    try {
        // mendapatkan id pengguna dari session
        const  idPustakawan = req.session.penggunaId
        const pengguna = await modelPengguna.getPenggunaById(idPustakawan)

        // destructuring req.body
        const {kata_sandi, kata_sandi_baru, konfirmasi_kata_sandi_baru} = req.body

        // menyimpan data yang diinputkan user
        const data = {kata_sandi, kata_sandi_baru, konfirmasi_kata_sandi_baru}

        // input kata sandi tidak boleh kosong
        if (!kata_sandi) {
            req.flash('error', 'kata sandi tidak boleh kosong')
            req.flash('data', req.body)
            return res.redirect('/pustakawan/ubah-kata-sandi')
        }

        // input kata sandi baru tidak boleh kosong
        if (!kata_sandi_baru) {
            req.flash('error', 'kata sandi baru tidak boleh kosong')
            req.flash('data', req.body)
            return res.redirect('/pustakawan/ubah-kata-sandi')
        }

        // input konfirmasi kata sandi baru tidak boleh kosong
        if (!konfirmasi_kata_sandi_baru) {
            req.flash('error', 'konfirmasi kata sandi baru tidak boleh kosong')
            req.flash('data', req.body)
            return res.redirect('/pustakawan/ubah-kata-sandi')
        }

        // mengecek kecocokan kata sandi lama dengan yang ada di database
        if (!(await bcrypt.compare(kata_sandi, pengguna.kata_sandi))) {
            req.flash('error', 'Kata sandi yang anda inputkan salah')
            req.flash('data', req.body)
            return res.redirect('/pustakawan/ubah-kata-sandi')
        }

        // kata sandi minimal 6 karakter
        if (kata_sandi.length < 6) {
            req.flash('error', 'Password Minimal 6 karakter')
            req.flash('data', req.body)
            return res.redirect('/pustakawan/ubah-kata-sandi')
        }

        // kata sandi minimal 1 huruf kapital
        if (!/[A-Z]/.test(kata_sandi)) {
            req.flash('error', 'Password Minimal 1 Huruf Kapital')
            req.flash('data', req.body)
            return res.redirect('/pustakawan/ubah-kata-sandi')
        }

        // kata sandi minimal 1 huruf kecil
        if (!/[a-z]/.test(kata_sandi)) {
            req.flash('error', 'Password Minimal 1 Huruf Kecil')
            req.flash('data', req.body)
            return res.redirect('/pustakawan/ubah-kata-sandi')
        }

        // kata sandi minimal 1 angka
        if (!/\d/.test(kata_sandi)) {
            req.flash('error', 'Password Minimal 1 Angka')
            req.flash('data', req.body)
            return res.redirect('/pustakawan/ubah-kata-sandi')
        }

        // cek kesesuaian kata_sandi dan konfirmasi_kata_sandi
        if (kata_sandi_baru != konfirmasi_kata_sandi_baru) {
            req.flash('error', 'Konfirmasi kata sandi baru tidak sama')
            req.flash('data', req.body)
            return res.redirect('/pustakawan/ubah-kata-sandi')
        }

        req.flash('success', 'Kata sandi berhasil diubah')
        await modelPengguna.updatePassword(data, idPustakawan)
        res.redirect('/pustakawan/dashboard')
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/pustakawan/ubah-kata-sandi')
    }
})

module.exports = router