const express = require('express')
const router = express.Router()
const modelPengguna = require('../../model/modelPengguna')
const modelMajalah = require('../../model/modelMajalah')
const modelBuku = require('../../model/modelBuku')
const {authManajer} = require('../../middleware/auth')

router.get('/', authManajer, async (req, res) => {
    try {
        const userId = req.session.penggunaId

        const  user = await modelPengguna.getPenggunaById(userId)

        const pustakawanProses = await modelPengguna.getPustakawanProses()
        const pustakawanAktif = await modelPengguna.getPustakawanAktif()
        const totalBukuHapus = await modelBuku.getCountBukuHapus()
        const totalMajalahHapus = await modelMajalah.getCountMajalahHapus()
        const newBukuHapus = await modelBuku.getNewBukuHapus()
        const newMajalahHapus = await modelMajalah.getNewMajalahHapus()

        res.render('pengurus/manajer/dashboard', { pustakawanProses, pustakawanAktif, totalBukuHapus, totalMajalahHapus, newBukuHapus, newMajalahHapus, user })
    } catch(err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/')
    }
})


module.exports = router