const express = require('express')
const router = express.Router()
const modelBuku = require('../../model/modelBuku')
const modelMajalah = require('../../model/modelMajalah')

router.get('/', async (req, res) => {
    res.render('pengguna/index')
})

router.post('/', async (req, res) => {
    try {
        const {keyword} = req.body
        const result = await modelBuku.getBukuAndMajalah(keyword)

        res.render('pengguna/index', { result, keyword })
    } catch(err) {
        req.flash('error', err.msg)
    }
})

router.get('/detail/:tipe/:id', async (req, res) => {
    try {
        const { id, tipe } = req.params

        if (tipe == 'Majalah') {
            const rows = await modelMajalah.getDetailMajalah(id)
            const majalah = rows[0]
            res.render('pengguna/detail_majalah', { majalah })
        } else if (tipe == 'Buku') {
            const rows = await modelBuku.getDetailBuku(id)
            const buku = rows[0]
            res.render('pengguna/detail_buku', { buku })
        }
    } catch (err) {
        req.flash('error', err.message)
        res.redirect('/')
    }
})


module.exports = router