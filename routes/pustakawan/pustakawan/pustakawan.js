const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const modelPengguna = require('../../../model/modelPengguna')
const {authPustakawan} = require('../../../middleware/auth')

router.get('/ubah-kata-sandi', authPustakawan, async (req, res) => {
    const userId = req.session.penggunaId

    const  user = await modelPengguna.getPenggunaById(userId)
    res.render('pengurus/pustakawan/pustakawan/ubahKataSandi', { 
        user,
        data: req.flash('data')[0]
    })
})

router.post('/change-password', authPustakawan, async (req, res) => {
    try {
        const  idPustakawan = req.session.penggunaId

        const pengguna = await modelPengguna.getPenggunaById(idPustakawan)

        const {kata_sandi, kata_sandi_baru, konfirmasi_kata_sandi_baru} = req.body

        const data = {kata_sandi, kata_sandi_baru, konfirmasi_kata_sandi_baru}

        if (!kata_sandi) {
            req.flash('error', 'kata sandi tidak boleh kosong')
            req.flash('data', req.body)
            return res.redirect('/pustakawan/ubah')
        }

        if (!kata_sandi_baru) {
            req.flash('error', 'kata sandi baru tidak boleh kosong')
            req.flash('data', req.body)
            return res.redirect('/pustakawan/ubah')
        }

        if (!konfirmasi_kata_sandi_baru) {
            req.flash('error', 'konfirmasi kata sandi baru tidak boleh kosong')
            req.flash('data', req.body)
            return res.redirect('/pustakawan/ubah')
        }

        if (!(await bcrypt.compare(kata_sandi, pengguna.kata_sandi))) {
            req.flash('error', 'Kata sandi yang anda inputkan salah')
            req.flash('data', req.body)
            return res.redirect('/pustakawan/ubah')
        }

        if (kata_sandi.length < 6) {
            req.flash('error', 'Password Minimal 6 karakter')
            req.flash('data', req.body)
            return res.redirect('/pustakawan/ubah')
        }
        if (!/[A-Z]/.test(kata_sandi)) {
            req.flash('error', 'Password Minimal 1 Huruf Kapital')
            req.flash('data', req.body)
            return res.redirect('/pustakawan/ubah')
        }
        if (!/[a-z]/.test(kata_sandi)) {
            req.flash('error', 'Password Minimal 1 Huruf Kecil')
            req.flash('data', req.body)
            return res.redirect('/pustakawan/ubah')
        }
        if (!/\d/.test(kata_sandi)) {
            req.flash('error', 'Password Minimal 1 Angka')
            req.flash('data', req.body)
            return res.redirect('/pustakawan/ubah')
        }

        if (kata_sandi_baru != konfirmasi_kata_sandi_baru) {
            req.flash('error', 'Konfirmasi kata sandi baru tidak sama')
            req.flash('data', req.body)
            return res.redirect('/pustakawan/ubah')
        }

        req.flash('success', 'Kata sandi berhasil diubah')

        await modelPengguna.updatePassword(data, idPustakawan)
        res.redirect('/logout')
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/pustakawan/dashboard')
    }
})

module.exports = router