const express = require('express')
const router = express.Router()
const modelPengurus = require('../../model/modelPengurus')
const modelMajalah = require('../../model/modelMajalah')
const modelBuku = require('../../model/modelBuku')
const {authAdmin} = require('../../middleware/auth')

router.get('/', authAdmin, async (req, res) => {
    try {
        const userId = req.session.pengurusId

        const  user = await modelPengurus.getPengurusById(userId)

        const pengurusProses = await modelPengurus.getPengurusProses()
        const pengurusAktif = await modelPengurus.getPengurusAktif()
        const totalBukuHapus = await modelBuku.getCountBukuHapus()
        const totalMajalahHapus = await modelMajalah.getCountMajalahHapus()
        const newBukuHapus = await modelBuku.getNewBukuHapus()
        const newMajalahHapus = await modelMajalah.getNewMajalahHapus()

        res.render('pengurus/admin/dashboard', { pengurusProses, pengurusAktif, totalBukuHapus, totalMajalahHapus, newBukuHapus, newMajalahHapus, user })
    } catch(err) {
        req.flash('error', err.message)
        res.redirect('/')
    }
})


module.exports = router