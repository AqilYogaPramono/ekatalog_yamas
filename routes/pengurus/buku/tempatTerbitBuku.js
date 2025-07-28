var express = require('express')
var router = express.Router()
const modelTempatTerbitBuku = require('../../../model/modelTempatTerbitBuku')

router.get('/', async (req, res) => {
    try {
        const data = await modelTempatTerbitBuku.getAll()
        res.render('pengurus/user/buku/tempatTerbitBuku/index', {data})
    } catch(err) {
        req.flash("error", err.message)
        return res.redirect('/pengurus/tempat-terbit-buku')
    }
})

router.get('/buat', async (req, res) => {
    res.render('pengurus/user/buku/tempatTerbitBuku/buat')
})

router.post('/create', async (req, res) => {
    try {
        const {nama_tempat_terbit} = req.body
        const data = {nama_tempat_terbit}
        await modelTempatTerbitBuku.store(data)
        req.flash('success', 'Data Berhasil Ditambah')
        res.redirect('/pengurus/tempat-terbit-buku')
    } catch(err) {
        req.flash("error", err.message)
        return res.redirect('/pengurus/tempat-terbit-buku')
    }
})

router.get('/edit/:id', async (req, res) => {
    try {
        const {id} = req.params
        const data = await modelTempatTerbitBuku.getById(id)
        res.render('pengurus/user/buku/tempatTerbitBuku/edit', {data})
    } catch(err) {
        req.flash("error", err.message)
        return res.redirect('/pengurus/tempat-terbit-buku')
    }
})

router.post('/update/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {nama_tempat_terbit} = req.body
        const data = {nama_tempat_terbit}
        await modelTempatTerbitBuku.update(data, id)
        req.flash('success', 'Data berhasil Diupdate')
        res.redirect('/pengurus/tempat-terbit-buku')
    } catch(err) {
        req.flash("error", err.message)
        return res.redirect('/pengurus/tempat-terbit-buku')
    }
})

router.post('/delete/:id', async (req, res) => {
    try {
        const {id} = req.params
        await modelTempatTerbitBuku.delete(id)
        req.flash('success', 'Data berhasil dihapus')
        res.redirect('/pengurus/tempat-terbit-buku')
    } catch(err) {
        req.flash("error", err.message)
        return res.redirect('/pengurus/tempat-terbit-buku')
    }
})

module.exports = router