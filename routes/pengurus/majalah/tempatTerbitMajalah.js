const express = require('express')
const router = express.Router()
//import model tempat terbit majalah 
const modelTempatterbitMajalah = require('../../../model/modelTempatTerbitMajalah')

//menampilakn semua data tempat terbit majalah
router.get('/', async (req, res) => {
    try {
        let data = await modelTempatterbitMajalah.getAll()
        console.log(data)
        res.render('pengurus/user/majalah/tempatTerbitMajalah/index', {data})
    } catch(err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/pengurus/tempat-terbit-majalah')
    }
})

router.get('/buat', (req, res) => {
    res.render('pengurus/user/majalah/tempatTerbitMajalah/buat')
})

//menabahkan data tempat terbit majalah baru
router.post('/create', async (req, res) => {
    try {
        let {nama_tempat_terbit_majalah} = req.body
        let data = {nama_tempat_terbit_majalah}
        await modelTempatterbitMajalah.store(data)
        req.flash('success', 'Tempat Terbit Majalah berhasil ditambahkan')
        res.redirect('/pengurus/tempat-terbit-majalah')
    } catch(err) {
        req.flash('error', err.message)
        res.redirect('/pengurus/tempat-terbit-majalah')
    }
})

router.get('/edit/:id', async (req, res) => {
    try {
        let {id} = req.params
        let data = await modelTempatterbitMajalah.getById(id)
        res.render('pengurus/user/majalah/tempatTerbitMajalah/edit', {data})
    } catch(err) {
        req.flash('error', err.message)
        res.redirect('/pengurus/tempat-terbit-majalah')
    }
})

//memgupdate data tempat terbit majalah berdasarkan id
router.post('/update/:id', async (req, res) => {
    try {
        let {id} = req.params.id
        let {nama_tempat_terbit_majalah} = req.body
        let data = {nama_tempat_terbit_majalah}
        await modelTempatterbitMajalah.update(data,id)
        req.flash('success', 'Tempat Terbit Majalah berhasil diupdate')
        res.redirect('/pengurus/tempat-terbit-majalah')
    } catch(err) {
        req.flash('error', err.message)
    }
})

//mengapus data tempat terbit majalah berdasarakn id
router.post('/delete/:id', async (req, res) => {
    try {
        let {id} = req.params
        await modelTempatterbitMajalah.delete(id)
        console.log(id)
        req.flash('success', 'Tempat Terbit Majalah berhasil dihapus')
        res.redirect('/pengurus/tempat-terbit-majalah')
    } catch(err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/pengurus/tempat-terbit-majalah')
    }
})

module.exports = router