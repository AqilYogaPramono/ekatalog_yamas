var express = require('express')
var router = express.Router()
const modelTempatTerbit = require('../../../model/modelTempatTerbit')

router.get('/', async (req, res) => {
    try {
        const data = await modelTempatTerbit.getAll()
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
        await modelTempatTerbit.store(data)
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
        const data = await modelTempatTerbit.getById(id)
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
        await modelTempatTerbit.update(data, id)
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
        await modelTempatTerbit.delete(id)
        req.flash('success', 'Data berhasil dihapus')
        res.redirect('/pengurus/tempat-terbit-buku')
    } catch(err) {
        req.flash("error", err.message)
        return res.redirect('/pengurus/tempat-terbit-buku')
    }
})

module.exports = router