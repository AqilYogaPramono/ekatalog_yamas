const express = require('express')
const router = express.Router()
//import model lantai 
const modelLantai = require('../../../model/modelLantai')
const {authPustakawan} = require('../.././../middleware/auth')
const modelPengguna = require('../../../model/modelPengguna')

//menampilakn semua data lantai
router.get('/', authPustakawan, async (req, res) => {
    try {
        let data = await modelLantai.getAll()
        const userId = req.session.penggunaId

        const  user = await modelPengguna.getPenggunaById(userId)
        console.log(userId, user)
        res.render('pengurus/pustakawan/lokasi/lantai/index', {data, user})
    } catch(err) {
        console.log(err)
        req.flash("error", err.message)
        return res.redirect('/pengurus/lantai')
    }
})

//menampilkan halaman untuk menambahkan data lantai
router.get('/buat', authPustakawan, async (req, res) => {
    const userId = req.session.penggunaId

    const  user = await modelPengguna.getPenggunaById(userId)
    res.render('pengurus/pustakawan/lokasi/lantai/buat', { 
        user,
        data: req.flash('data')[0]
    })
})

//menabahkan data lantai baru
router.post('/create', authPustakawan, async (req, res) => {
    try {
        let {kode_lantai} = req.body
        if (!kode_lantai) {
            req.flash("error", "Kode lantai tidak boleh kosong")
            req.flash('data', req.body)
            return res.redirect('/pustakawan/lantai/buat')
        }
        let data = {kode_lantai}
        const checkLantai = await modelLantai.checkLantai(data)
        if (checkLantai) {
            req.flash("error", "Lantai Sudah dibuat")
            req.flash('data', req.body)
            return res.redirect('/pustakawan/lantai/buat')
        }
        await modelLantai.store(data)
        req.flash('success', 'Data Berhasil Ditambahkan')
        res.redirect('/pustakawan/lantai')
    } catch(err) {
        console.log(err)
        req.flash("error", err.message)
        req.flash('data', req.body)
        return res.redirect('/pustakawan/lantai')
    }
})

//menampilkan halaman untuk mengedit kode lantai
router.get('/edit/:id', authPustakawan, async(req, res) => {
    try {
        const {id} = req.params
        const data = await modelLantai.getById(id)
        const userId = req.session.penggunaId

        const  user = await modelPengguna.getPenggunaById(userId)
        res.render('pengurus/pustakawan/lokasi/lantai/edit', {data, user})
    } catch(err) {
        console.log(err)
        req.flash("error", err.message)
        req.flash('data', req.body)
        return res.redirect('/pustakawan/lantai')
    }
})

//memgupdate data lantai berdasarkan id
router.post('/update/:id', authPustakawan, async (req, res) => {
    try {
        let {id} = req.params
        let {kode_lantai} = req.body
        let data = {kode_lantai}
        if (!kode_lantai) {
            req.flash("error", "Kode lantai tidak boleh kosong")
            req.flash('data', req.body)
            return res.redirect(`/pustakawan/lantai/edit/${id}`)
        }

        if (await modelLantai.checkLantai(data, id)) {
            req.flash("error", "Lantai Sudah dibuat")
            req.flash('data', req.body)
            return res.redirect(`/pustakawan/lantai/edit/${id}`)
        }

        await modelLantai.update(data, id)
        req.flash('success', 'Data Berhasil Diedit')
        res.redirect('/pustakawan/lantai')
    } catch (err) {
        console.log(err)
        req.flash("error", err.message)
        req.flash('data', req.body)
        return res.redirect('/pustakawan/lantai')
    }
})

//mengapus data lantai berdasarakn id
router.post('/delete/:id', authPustakawan, async (req, res) => {
    try {
        let {id} = req.params
        if (await modelLantai.checkLantaiUsed(id)) {
            req.flash("error", "Lantai masih digunakan oleh ruangan lain")
            req.flash('data', req.body)
            return res.redirect('/pustakawan/lantai')
        }

        await modelLantai.delete(id)
        req.flash('success', 'Data Berhasil Dihapus')
        res.redirect('/pustakawan/lantai')
    } catch(err) {
        console.log(err)
        req.flash("error", err.message)
        req.flash('data', req.body)
        return res.redirect('/pustakawan/lantai')
    }
})

module.exports = router