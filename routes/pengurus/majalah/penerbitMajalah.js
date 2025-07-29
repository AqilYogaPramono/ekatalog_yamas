const express = require('express')
const router = express.Router()
//import model penerbit majalah 
const modelPenerbitMajalah = require('../../../model/modelPenerbitMajalah')

//menampilakn semua data penerbit majalah
router.get('/', async (req, res) => {
    try {
        const data = await modelPenerbitMajalah.getAll()
        res.render('pengurus/user/majalah/penerbitMajalah/index', {data})
    } catch(err) {
        req.flash('error', err.message)
        res.redirect('/pengurus/penerbit-majalah')
    }
})

router.get('/buat', (req, res) => {
    res.render('pengurus/user/majalah/penerbitMajalah/buat')
})

//menabahkan data penerbit majalah baru
router.post('/create', async(req, res) => {
    try {
        const {nama_penerbit} = req.body
        const data = {nama_penerbit}
        await modelPenerbitMajalah.store(data)
        req.flash('success', 'Penerbit Majalah berhasil ditambahkan')
        res.redirect('/pengurus/penerbit-majalah')
    } catch(err) {
        req.flash('error', err.message)
        res.redirect('/pengurus/penerbit-majalah')
    }
})

router.get('/edit/:id', async(req, res) => {
    try {
        const {id} = req.params
        const data = await modelPenerbitMajalah.getById(id)
        res.render('pengurus/user/majalah/penerbitMajalah/edit', {data})
    } catch(err) {
        req.flash('error', err.message)
        res.redirect('/pengurus/penerbit-majalah')
    }
})

//memgupdate data penerbit majalah berdasarkan id
router.post('/update/:id', async(req, res) => {
    try {
        const {id} = req.params
        const {nama_penerbit} = req.body
        const data = {nama_penerbit}
        await modelPenerbitMajalah.update(data, id)
        req.flash('success', 'Penerbit Majalah berhasil diupdate')
        res.redirect('/pengurus/penerbit-majalah')
    } catch(err) {
        req.flash(err)
    }
})

//mengapus data penerbit majalah berdasarakn id
router.post('/delete/:id', async(req, res) => {
    try {
        const {id} = req.params
        await modelPenerbitMajalah.delete(id)
        req.flash('success', 'Penerbit Majalah berhasil dihapus')
        res.redirect('/pengurus/penerbit-majalah')
    } catch(err) {
        req.flash('error', err.message)
        res.redirect('/pengurus/penerbit-majalah')
    }
})

module.exports = router