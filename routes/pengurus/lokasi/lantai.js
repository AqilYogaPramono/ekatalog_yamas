const express = require('express')
const router = express.Router()
//import model lantai 
const modelLantai = require('../../../model/modelLantai')

//menampilakn semua data lantai
router.get('/', async (req, res) => {
    try {
        let data = await modelLantai.getAll()
        res.render('pengurus/user/lokasi/lantai/index', {data})
    } catch(err) {
        console.log(err)
        req.flash("error", "Internal Server Error")
        return res.redirect('/pengurus/lantai')
    }
})

//menampilkan halaman untuk menambahkan data lantai
router.get('/buat', async (req, res) => {
    res.render('pengurus/user/lokasi/lantai/buat')
})

//menabahkan data lantai baru
router.post('/create', async (req, res) => {
    try {
        let {kode_lantai} = req.body
        if (!kode_lantai) {
            req.flash("error", "Kode lantai tidak boleh kosong")
            return res.redirect('/pengurus/lantai/buat')
        }
        let data = {kode_lantai}
        await modelLantai.store(data)
        res.redirect('/pengurus/lantai')
    } catch(err) {
        req.flash("error", "Internal Server Error")
        return res.redirect('/pengurus/lantai')
    }
})

//menampilkan halaman untuk mengedit kode lantai
router.get('/edit/:id', async(req, res) => {
    try {
        const {id} = req.params
        const data = await modelLantai.getById(id)
        res.render('pengurus/user/lokasi/lantai/edit', {data})
    } catch(err) {
        req.flash("error", "Data tidak ditemukan")
        return res.redirect('/pengurus/lantai')
    }
})

//memgupdate data lantai berdasarkan id
router.post('/update/:id', async (req, res) => {
    try {
        let {id} = req.params
        let {kode_lantai} = req.body
        let data = {kode_lantai}
        await modelLantai.update(data, id)
        res.redirect('/pengurus/lantai')
    } catch (err) {
        req.flash("error", "Internal Server Error")
        return res.redirect('/pengurus/lantai')
    }
})

//mengapus data lantai berdasarakn id
router.post('/delete/:id', async (req, res) => {
    try {
        let {id} = req.params
        await modelLantai.delete(id)
        res.redirect('/pengurus/lantai')
    } catch(err) {
        req.flash("error", "Internal Server Error")
        return res.redirect('/pengurus/lantai')
    }
})

module.exports = router