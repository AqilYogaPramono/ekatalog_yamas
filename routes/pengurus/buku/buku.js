const express = require('express')
const router = express.Router()
// Import model buku
const modelBuku = require('../../../model/modelBuku')

router.get('/', async (req, res) => {
    try {
        const buku = await modelBuku.getAll()
        res.render('pengurus/user/buku/index', {buku})
    } catch (err) {
        req.flash('error', err.message)
        res.redirect('/pengurus/buku')
    }
})

router.get('/buat', (req, res) => {
    res.render('pengurus/user/buku/buat')
})



module.exports = router