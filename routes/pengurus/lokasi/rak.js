const express = require('express')
const router = express.Router()
//import model rak 
const modelRak = require('../../../model/modelRak')
//import model ruangan untuk menampilkan data ruanga
const modelRuangan = require('../../../model/modelRuangan')
//menampilakn semua data rak
router.get('/', async(req, res) => {
    try {
        let data = await modelRak.getAll()
        res.render('pengurus/user/lokasi/rak/index', {data})
    } catch(err) {
        req.flash('error', err.message)
    }
})

router.get('/buat', async (req, res) => {
    try {
        const ruangan = await modelRuangan.getAll()
        res.render('pengurus/user/lokasi/rak/buat', {ruangan})
    } catch (err) {
        req.flash('error', err.message)
        res.redirect('/pengurus/rak')
    }
})

//menabahkan data rak baru
router.post('/create', async(req, res) => {
    try {
        let {id_ruangan, kode_rak} = req.body
        let data = {id_ruangan, kode_rak}
        const checkRak = await modelRak.checkRak(data)
        if (checkRak) {
            req.flash('error', 'Kode Rak sudah ada')
            return res.redirect('/pengurus/rak/buat')
        }
        await modelRak.store(data)
        res.redirect('/pengurus/rak')
    } catch(err) {
        req.flash('error', err.message)
        res.redirect('/pengurus/rak')
    }
})

router.get('/edit/:id', async (req, res) => {
    try {
        const {id} = req.params
        const rak = await modelRak.getById(id)
        const ruangan = await modelRuangan.getAll()
        res.render('pengurus/user/lokasi/rak/edit', {rak, ruangan})
    } catch(err) {
        req.flash('error', err.message)
        res.redirect('/pengurus/rak')
    }
})

//memgupdate data rak berdasarkan id
router.post('/update/:id', async(req, res) => {
    try {
        const {id} = req.params
        const {kode_rak, id_ruangan} = req.body
        const data = {kode_rak, id_ruangan}
        const rak = await modelRak.getById(id)
        const checkRak = await modelRak.checkRak(data)
        if (checkRak) {
            req.flash('error', 'Kode Rak sudah ada')
            return res.redirect(`/pengurus/rak/edit/${rak[0].id}`)
        }
        await modelRak.update(data, id)
        req.flash('success', 'Data berhasil Diupdate')
        res.redirect('/pengurus/rak')
    } catch(err) {
        req.flash('error', err.message)
        res.redirect('/pengurus/rak')
    }
})

//mengapus data rak berdasarakn id
router.post('/delete/:id', async (req, res) => {
    try {
        const {id} = req.params
        await modelRak.delete(id)
        req.flash('success', 'Data Berhasil Dihapus')
        res.redirect('/pengurus/rak')
    } catch(err) {
        req.flash('error', err.message)
        res.redirect('/pengurus/rak')
    }
})

module.exports = router