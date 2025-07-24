const express = require('express')
const router = express.Router()
const modelBuku = require('../../model/modelBuku')

router.get('/', async (req, res) => {
    try {
        // const {keyboard} = req.body
        // await modelBuku.getBukuDanMajalh(keyboard)
        res.render('pengguna/index')
    } catch(err) {
        req.flash('error', err.msg)
    }
})

module.exports = router