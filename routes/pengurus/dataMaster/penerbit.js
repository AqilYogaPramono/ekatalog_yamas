var express = require('express')
var router = express.Router()
//import model penerbit
const modelPenerbit = require('../../../model/modelPenerbit')

//menampilakn semua data penerbit
router.get('/', async(req, res) => {
    try {
        const data = await modelPenerbit.getAll()
        res.render('pengurus/user/dataMaster/penerbit/index', {data})
    } catch(err) {
        req.flash('error', err.message)
        res.redirect('/pengurus/penerbit')
    }
})

router.get('/buat', async(req, res) => {
    res.render('pengurus/user/dataMaster/penerbit/buat')
})

//menabahkan data penerbit baru
router.post('/create', async(req, res) => {
    try {
        const {nama_penerbit} = req.body
        const data = {nama_penerbit}
        await modelPenerbit.store(data)
        req.flash('success', 'Data Berhasil Ditambah')
        res.redirect('/pengurus/penerbit')
    } catch(err) {
        req.flash('error', err.message)
        res.redirect('/pengurus/penerbit')
    }
})

router.get('/edit/:id', async(req, res) => {
    try {
        const {id} = req.params
        const data = await modelPenerbit.getById(id)
        res.render('pengurus/user/dataMaster/penerbit/edit', {data})
    } catch (err) {
        req.flash('error', err.message)
        res.redirect('/pengurus/penerbit')
    }
})

//memgupdate data penerbit berdasarkan id
router.post('/update/:id', async(req, res) => {
    try {
        const {id} = req.params
        const {nama_penerbit} = req.body
        const data = {nama_penerbit}
        await modelPenerbit.update(data, id)
        req.flash('success', 'Data Berhasil Diupdate')
        res.redirect('/pengurus/penerbit')
    } catch(err) {
        req.flash('error', err.message)
        res.redirect('/pengurus/penerbit')
    }
})

//mengapus data penerbit berdasarakn id
router.post('/delete/:id', async(req,res) => {
    try {
        const {id} = req.params
        await modelPenerbit.delete(id)
        req.flash('success', 'Data Berhasil Dihapus')
        res.redirect('/pengurus/penerbit')
    } catch(err) {
        req.flash('error', err.message)
        res.redirect('/pengurus/penerbit')
    } 
})

module.exports = router