var express = require('express')
var router = express.Router()
const modelTempatTerbit = require('../../../model/modelTempatTerbit')

router.get('/', async (req, res) => {
    try {
        const data = await modelTempatTerbit.getAll()
        res.render('pengurus/user/dataMaster/tempatTerbit/index', {data})
    } catch(err) {
        req.flash("error", err.message)
        return res.redirect('/pengurus/tempat-terbit')
    }
})

router.get('/buat', async (req, res) => {
    res.render('pengurus/user/dataMaster/tempatTerbit/buat')
})

router.post('/create', async (req, res) => {
    try {
        const {kota, negara} = req.body
        const data = {kota, negara}
        await modelTempatTerbit.store(data)
        req.flash('success', 'Data Berhasil Ditambah')
        res.redirect('/pengurus/tempat-terbit')
    } catch(err) {
        req.flash("error", err.message)
        return res.redirect('/pengurus/tempat-terbit')
    }
})

router.get('/edit/:id', async (req, res) => {
    try {
        const {id} = req.params
        const data = await modelTempatTerbit.getById(id)
        res.render('pengurus/user/dataMaster/tempatTerbit/edit', {data})
    } catch(err) {
        req.flash("error", err.message)
        return res.redirect('/pengurus/tempat-terbit')
    }
})

router.post('/update/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {kota, negara} = req.body
        const data = {kota, negara}
        await modelTempatTerbit.update(data, id)
        req.flash('success', 'Data berhasil Diupdate')
        res.redirect('/pengurus/tempat-terbit')
    } catch(err) {
        req.flash("error", err.message)
        return res.redirect('/pengurus/tempat-terbit')
    }
})

router.post('/delete/:id', async (req, res) => {
    try {
        const {id} = req.params
        await modelTempatTerbit.delete(id)
        req.flash('success', 'Data berhasil dihapus')
        res.redirect('/pengurus/tempat-terbit')
    } catch(err) {
        req.flash("error", err.message)
        return res.redirect('/pengurus/tempat-terbit')
    }
})

module.exports = router