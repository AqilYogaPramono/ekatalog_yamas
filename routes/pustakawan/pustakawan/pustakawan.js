const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const modelPengguna = require('../../../model/modelPengguna')
const {authPustakawan} = require('../../../middleware/auth')

router.get('/ubah-password', authPustakawan, async (req, res) => {
    const userId = req.session.pustakawanId

    const  user = await modelPengguna.getPenggunaById(userId)
    res.render('pengurus/user/pengurus/ubahPassword', { user })
})

router.post('/change-password', authPustakawan, async (req, res) => {
    try {
        const  idPustakawan = req.session.pustakawanId

        const pengrus = await modelPengurus.getPengurusById(idPengurus)

        const {kata_sandi, kata_sandi_baru, konfirmasi_kata_sandi_baru} = req.body

        const data = {kata_sandi, kata_sandi_baru, konfirmasi_kata_sandi_baru}

        if (!kata_sandi) {
            req.flash('error', 'kata sandi tidak boleh kosong')
            return res.redirect('/pengurus/ubah-password')
        }

        if (!kata_sandi_baru) {
            req.flash('error', 'kata sandi baru tidak boleh kosong')
            return res.redirect('/pengurus/ubah-password')
        }

        if (!konfirmasi_kata_sandi_baru) {
            req.flash('error', 'konfirmasi kata sandi baru tidak boleh kosong')
            return res.redirect('/pengurus/ubah-password')
        }

        if (!(await bcrypt.compare(kata_sandi, pengrus.kata_sandi))) {
            req.flash('error', 'Kata sandi yang anda inputkan salah')
            res.redirect('/pengurus/ubah-password')
        }

        if (kata_sandi.length < 6) {
            req.flash('error', 'Password Minimal 6 karakter')
            return res.redirect('/pengurus/ubah-password')
        }
        if (!/[A-Z]/.test(kata_sandi)) {
            req.flash('error', 'Password Minimal 1 Huruf Kapital')
            return res.redirect('/pengurus/ubah-password')
        }
        if (!/[a-z]/.test(kata_sandi)) {
            req.flash('error', 'Password Minimal 1 Huruf Kecil')
            return res.redirect('/pengurus/ubah-password')
        }
        if (!/\d/.test(kata_sandi)) {
            req.flash('error', 'Password Minimal 1 Angka')
            return res.redirect('/pengurus/ubah-password')
        }

        if (kata_sandi_baru != konfirmasi_kata_sandi_baru) {
            req.flash('error', 'Konfirmasi kata sandi baru tidak sama')
            res.redirect('/pengurus/ubah-password')
        }

        req.flash('success', 'Kata sandi berhasil diubah')

        await modelPengurus.updatePassword(data, idPengurus)
        res.redirect('/logout')
    } catch (err) {
        req.flash('error', err.message)
        res.redirect('/pengurus/dashboard')
    }
})

module.exports = router