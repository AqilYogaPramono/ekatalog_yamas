const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const modelPengguna = require('../../model/modelPengguna')
const {authManajer} = require('../../middleware/auth')

router.get('/ubah-kata-sandi', authManajer, async (req, res) => {
    const userId = req.session.penggunaId

    const  user = await modelPengguna.getPenggunaById(userId)
    res.render('pengurus/manajer/manajer/ubahKataSandi', { 
        user,
        data: req.flash('data')[0]
    })
})

router.post('/change-password', authManajer, async (req, res) => {
    try {
        const  idManajer = req.session.penggunaId

        const pengguna = await modelPengguna.getPenggunaById(idManajer)

        const {kata_sandi, kata_sandi_baru, konfirmasi_kata_sandi_baru} = req.body

        const data = {kata_sandi, kata_sandi_baru, konfirmasi_kata_sandi_baru}

        if (!kata_sandi) {
            req.flash('error', 'kata sandi tidak boleh kosong')
            req.flash('data', req.body)
            return res.redirect('/manajer/ubah-kata-sandi')
        }

        if (!kata_sandi_baru) {
            req.flash('error', 'kata sandi baru tidak boleh kosong')
            req.flash('data', req.body)
            return res.redirect('/manajer/ubah-kata-sandi')
        }

        if (!konfirmasi_kata_sandi_baru) {
            req.flash('error', 'konfirmasi kata sandi baru tidak boleh kosong')
            req.flash('data', req.body)
            return res.redirect('/manajer/ubah-kata-sandi')
        }

        if (!(await bcrypt.compare(kata_sandi, pengguna.kata_sandi))) {
            req.flash('error', 'Kata sandi yang anda inputkan salah')
            req.flash('data', req.body)
            return res.redirect('/manajer/ubah-kata-sandi')
        }

        if (kata_sandi.length < 6) {
            req.flash('error', 'Password Minimal 6 karakter')
            req.flash('data', req.body)
            return res.redirect('/manajer/ubah-kata-sandi')
        }
        if (!/[A-Z]/.test(kata_sandi)) {
            req.flash('error', 'Password Minimal 1 Huruf Kapital')
            req.flash('data', req.body)
            return res.redirect('/manajer/ubah-kata-sandi')
        }
        if (!/[a-z]/.test(kata_sandi)) {
            req.flash('error', 'Password Minimal 1 Huruf Kecil')
            req.flash('data', req.body)
            return res.redirect('/manajer/ubah-kata-sandi')
        }
        if (!/\d/.test(kata_sandi)) {
            req.flash('error', 'Password Minimal 1 Angka')
            req.flash('data', req.body)
            return res.redirect('/manajer/ubah-kata-sandi')
        }

        if (kata_sandi_baru != konfirmasi_kata_sandi_baru) {
            req.flash('error', 'Konfirmasi kata sandi baru tidak sama')
            req.flash('data', req.body)
            return res.redirect('/manajer/ubah-kata-sandi')
        }

        req.flash('success', 'Kata sandi berhasil diubah')

        await modelPengguna.updatePassword(data, idManajer)
        res.redirect('/manajer/dashboard')
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/manajer/ubah-kata-sandi')
    }
})

module.exports = router