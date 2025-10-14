const express = require('express')
const router = express.Router()
const modelBuku = require('../../model/modelBuku')
const modelMajalah = require('../../model/modelMajalah')

router.get('/', async (req, res) => {
    try {
        res.render('pengguna/index')
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.render('pengguna/index')
    }
})

router.post('/', async (req, res) => {
    try {
        const {keyword} = req.body
        const result = await modelBuku.getBukuAndMajalah(keyword)

        res.render('pengguna/index', { 
            result, 
            keyword
        })
    } catch(err) {
        req.flash('error', err.message)
        res.render('pengguna/index', { 
            result: [],
            keyword: ''
        })
    }
})

router.get('/detail/:tipe/:id', async (req, res) => {
    try {
        const { id, tipe } = req.params

        if (tipe == 'Majalah') {
            const rows = await modelMajalah.getDetailMajalah(id)
            if (rows.length === 0) {
                req.flash('error', 'Majalah tidak ditemukan')
                return res.redirect('/')
            }
            const majalah = rows[0]
            res.render('pengguna/detail_majalah', { majalah })
        } else if (tipe == 'Buku') {
            const rows = await modelBuku.getDetailBuku(id)
            if (rows.length === 0) {
                req.flash('error', 'Buku tidak ditemukan')
                return res.redirect('/')
            }
            const buku = rows[0]
            res.render('pengguna/detail_buku', { buku })
        } else {
            req.flash('error', 'Tipe tidak valid')
            res.redirect('/')
        }
    } catch (err) {
        req.flash('error', err.message)
        res.redirect('/')
    }
})


module.exports = router