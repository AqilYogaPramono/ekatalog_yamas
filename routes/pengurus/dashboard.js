const express = require('express')
const router = express.Router()
const modelBuku = require('../../model/modelBuku')
const modelMajalah = require('../../model/modelMajalah')
const modelPengurus = require('../../model/modelPengurus')
const {authPengurus} = require('../../middleware/auth')

router.get('/', authPengurus, async (req, res) => {
    try {
        const userId = req.session.pengurusId

        const totalBuku = await modelBuku.getCountBuku()
        const totalMajalah = await modelMajalah.getCountMajalah()
        const newBuku = await modelBuku.getNewBuku()
        const newMajalah = await modelMajalah.getNewMajalah()
        const  user = await modelPengurus.getPengurusById(userId)

        res.render('pengurus/user/dashboard', { totalBuku, totalMajalah, newBuku, newMajalah, user })
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/')
    }
})

module.exports = router