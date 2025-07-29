const express = require('express')
const router = express.Router()
//import model ruangan 
const modelRuangan = require('../../../model/modelRuangan')
//import model lantai untuk menampilkan data lantai
const modelLantai = require('../../../model/modelLantai')

//menampilakn semua data ruangan
router.get('/', async(req, res) => {
    try {
        const data = await modelRuangan.getAll()
        res.render('pengurus/user/lokasi/ruangan/index', {data})
    } catch(err) {
        req.flash('error', err.message)
        res.redirect('/pengurus/ruangan')
    }
})

//menampilkan halaman untuk menambahkan data ruangan
router.get('/buat', async (req, res) => {
    try {
        const data = await modelLantai.getAll()
        res.render('pengurus/user/lokasi/ruangan/buat', { data })
    } catch(err) {
        req.flash('error', err.message)
        res.redirect('/pengurus/ruangan')
    }
})

//menabahkan data ruangan baru
router.post('/create', async(req, res) => {
    try {
        const {id_lantai, kode_ruangan} = req.body
        if (!id_lantai) {
            req.flash('error', 'Kode lantai tidak boleh kosong')
            return res.redirect('/pengurus/ruangan/buat')
        }
        if (!kode_ruangan) {
            req.flash('error', 'Kode ruangan tidak boleh kosong')
            return res.redirect('/pengurus/ruangan/buat')
        }
        const data = {id_lantai, kode_ruangan}
        const checkRuangan = await modelRuangan.checkKodeRuangan(data)
        if (checkRuangan) {
            req.flash('error', 'Kode ruangan tidak boleh sama')
            return res.redirect('/pengurus/ruangan/buat')
        }
        await modelRuangan.store(data)
        req.flash('success', 'Data ruangan berhasil ditambahkan')
        res.redirect('/pengurus/ruangan')
    } catch(err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/pengurus/ruangan')
    }
})

router.get('/edit/:id', async (req, res) => {
    try {
        const {id} = req.params
        const data = await modelRuangan.getById(id)
        const lantai = await modelLantai.getAll()
        res.render('pengurus/user/lokasi/ruangan/edit', {data, lantai})
    } catch(err) {
        req.flash('error', "Data ruangan tidak ditemukan")
        res.redirect('/pengurus/ruangan')
    }
})

//memgupdate data ruangan berdasarkan id
router.post('/update/:id', async(req, res) => {
    try {
        const {id} = req.params
        const {kode_ruangan, id_lantai} = req.body
        if (!id_lantai) {
            req.flash('error', 'Kode lantai tidak boleh kosong')
            return res.redirect('/pengurus/ruangan/buat')
        }
        if (!kode_ruangan) {
            req.flash('error', 'Kode ruangan tidak boleh kosong')
            return res.redirect('/pengurus/ruangan/buat')
        }
        const data = {kode_ruangan, id_lantai}
        await modelRuangan.update(data, id)
        req.flash('success', 'Data berhasil diupdate')
        res.redirect('/pengurus/ruangan')
    } catch(err) {
        req.flash('error', err.message)
        res.redirect('/pengurus/ruangan')
    }
})

//mengapus data ruangan berdasarakn id
router.post('/delete/:id', async (req, res) => {
    try {
        const {id} = req.params
        await modelRuangan.delete(id)
        req.flash('success', 'Data ruangan berhasil dihapus')
        res.redirect('/pengurus/ruangan')
    } catch(err) {
        req.flash('error', err.message)
        res.redirect('/pengurus/ruangan')
    }
})

module.exports = router