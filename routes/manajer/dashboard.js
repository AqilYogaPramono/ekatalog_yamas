const express = require('express')
const router = express.Router()
// import model pengguna
const modelPengguna = require('../../model/modelPengguna')
// import model majalah
const modelMajalah = require('../../model/modelMajalah')
// import model buku
const modelBuku = require('../../model/modelBuku')
// import middleware untuk mengecek peran pengguna login
const {authManajer} = require('../../middleware/auth')

// router get dashboard manajer
router.get('/', authManajer, async (req, res) => {
    try {
        // mendapatkan id pengguna dari session
        const userId = req.session.penggunaId
        const user = await modelPengguna.getNamaPenggunaById(userId)

        // total akun pustakawan dengan status data proses
        const pustakawanProses = await modelPengguna.getPustakawanProses()
        // total akun pustakawan dengan status data aktif
        const pustakawanAktif = await modelPengguna.getPustakawanAktif()
        // total buku dengan status data hapus
        const totalBukuHapus = await modelBuku.getCountBukuHapus()
        // total majalah dengan status hapus
        const totalMajalahHapus = await modelMajalah.getCountMajalahHapus()
        // mengambil buku terbaru yang di hapus
        const newBukuHapus = await modelBuku.getNewBukuHapus()
        // mengambil majalah terbaru yang di hapus
        const newMajalahHapus = await modelMajalah.getNewMajalahHapus()

        res.render('pengurus/manajer/dashboard', { pustakawanProses, pustakawanAktif, totalBukuHapus, totalMajalahHapus, newBukuHapus, newMajalahHapus, user })
    } catch(err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/')
    }
})


module.exports = router