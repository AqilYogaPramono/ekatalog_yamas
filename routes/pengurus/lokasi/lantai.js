const express = require('express')
const router = express.Router()
//import model lantai 
const modelLantai = require('../../../model/modelLantai')
const {authPengurus} = require('../.././../middleware/auth')
const modelPengurus = require('../../../model/modelPengurus')

//menampilakn semua data lantai
router.get('/', authPengurus, async (req, res) => {
    try {
        let data = await modelLantai.getAll()
        const userId = req.session.pengurusId

        const  user = await modelPengurus.getPengurusById(userId)
        res.render('pengurus/user/lokasi/lantai/index', {data, user})
    } catch(err) {
        req.flash("error", err.message)
        return res.redirect('/pengurus/lantai')
    }
})

//menampilkan halaman untuk menambahkan data lantai
router.get('/buat', authPengurus, async (req, res) => {
    const userId = req.session.pengurusId

    const  user = await modelPengurus.getPengurusById(userId)
    res.render('pengurus/user/lokasi/lantai/buat', { user })
})

//menabahkan data lantai baru
router.post('/create', authPengurus, async (req, res) => {
    try {
        let {kode_lantai} = req.body
        if (!kode_lantai) {
            req.flash("error", "Kode lantai tidak boleh kosong")
            return res.redirect('/pengurus/lantai/buat')
        }
        let data = {kode_lantai}
        const checkLantai = await modelLantai.checkLantai(data)
        if (checkLantai) {
            req.flash("error", "Lantai Sudah dibuat")
            return res.redirect('/pengurus/lantai/buat')
        }
        await modelLantai.store(data)
        req.flash('success', 'Data Berhasil Ditambahkan')
        res.redirect('/pengurus/lantai')
    } catch(err) {
        req.flash("error", err.message)
        return res.redirect('/pengurus/lantai')
    }
})

//menampilkan halaman untuk mengedit kode lantai
router.get('/edit/:id', authPengurus, async(req, res) => {
    try {
        const {id} = req.params
        const data = await modelLantai.getById(id)
        const userId = req.session.pengurusId

        const  user = await modelPengurus.getPengurusById(userId)
        res.render('pengurus/user/lokasi/lantai/edit', {data, user})
    } catch(err) {
        req.flash("error", err.message)
        return res.redirect('/pengurus/lantai')
    }
})

//memgupdate data lantai berdasarkan id
router.post('/update/:id', authPengurus, async (req, res) => {
    try {
        let {id} = req.params
        let {kode_lantai} = req.body
        if (!kode_lantai) {
            req.flash("error", "Kode lantai tidak boleh kosong")
            return res.redirect(`/pengurus/lantai/edit/${id}`)
        }
        let data = {kode_lantai}
        await modelLantai.update(data, id)
        req.flash('success', 'Data Berhasil Diedit')
        res.redirect('/pengurus/lantai')
    } catch (err) {
        req.flash("error", err.message)
        return res.redirect('/pengurus/lantai')
    }
})

//mengapus data lantai berdasarakn id
router.post('/delete/:id', authPengurus, async (req, res) => {
    try {
        let {id} = req.params
        await modelLantai.delete(id)
        req.flash('success', 'Data Berhasil Dihapus')
        res.redirect('/pengurus/lantai')
    } catch(err) {
        req.flash("error", err.message)
        return res.redirect('/pengurus/lantai')
    }
})

module.exports = router