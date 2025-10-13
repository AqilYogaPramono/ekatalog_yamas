const express = require('express')
const router = express.Router()
// import model buku
const modelBuku = require('../../model/modelBuku')
// import model majalah
const modelMajalah = require('../../model/modelMajalah')
// import model pengguna
const modelPengguna = require('../../model/modelPengguna')
// import middleware untuk mengecek peran pengguna login
const {authPustakawan} = require('../../middleware/auth')

// route view dashboard pustakawan
router.get('/', authPustakawan, async (req, res) => {
    try {
        // mendapatkan id pengguna dari session
        const userId = req.session.penggunaId
        const user = await modelPengguna.getNamaPenggunaById(userId)

        // total buku dengan status data tampil
        const totalBuku = await modelBuku.getCountBuku()
        // total majalah dengan status data tampil
        const totalMajalah = await modelMajalah.getCountMajalah()
        // mengambil buku terbaru yang dibuat
        const newBuku = await modelBuku.getNewBuku()
        // mengambil majalah terbaru yang dibuat
        const newMajalah = await modelMajalah.getNewMajalah()

        res.render('pengurus/pustakawan/dashboard', { totalBuku, totalMajalah, newBuku, newMajalah, user })
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/')
    }
})

module.exports = router