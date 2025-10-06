const express = require('express')
const router = express.Router()
const modelBuku = require('../../model/modelBuku')
const modelMajalah = require('../../model/modelMajalah')
const modelPengguna = require('../../model/modelPengguna')
const {authPustakawan} = require('../../middleware/auth')

router.get('/', authPustakawan, async (req, res) => {
    try {
        const userId = req.session.penggunaId

        const user = await modelPengguna.getPenggunaById(userId)
        const totalBuku = await modelBuku.getCountBuku()
        const totalMajalah = await modelMajalah.getCountMajalah()
        const newBuku = await modelBuku.getNewBuku()
        const newMajalah = await modelMajalah.getNewMajalah()

        res.render('pengurus/pustakawan/dashboard', { totalBuku, totalMajalah, newBuku, newMajalah, user })
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/')
    }
})

module.exports = router