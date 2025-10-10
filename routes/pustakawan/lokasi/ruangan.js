const express = require('express')
const router = express.Router()
//import model ruangan 
const modelRuangan = require('../../../model/modelRuangan')
//import model lantai untuk menampilkan data lantai
const modelLantai = require('../../../model/modelLantai')
const {authPustakawan} = require('../.././../middleware/auth')
const modelPengguna = require('../../../model/modelPengguna')

//menampilakn semua data ruangan
router.get('/', authPustakawan, async(req, res) => {
    try {
        const data = await modelRuangan.getAll()
        const userId = req.session.penggunaId

        const  user = await modelPengguna.getPenggunaById(userId)
        res.render('pengurus/pustakawan/lokasi/ruangan/index', {data, user})
    } catch(err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/pustakawan/dashboard')
    }
})

//menampilkan halaman untuk menambahkan data ruangan
router.get('/buat', authPustakawan, async (req, res) => {
    try {
        const lantai = await modelLantai.getAll()
        const userId = req.session.penggunaId

        const  user = await modelPengguna.getPenggunaById(userId)
        res.render('pengurus/pustakawan/lokasi/ruangan/buat', { 
            lantai, 
            user,
            data: req.flash('data')[0]
        })
    } catch(err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/pustakawan/ruangan')
    }
})

//menabahkan data ruangan baru
router.post('/create', authPustakawan, async(req, res) => {
    try {
        const {id_lantai, kode_ruangan} = req.body
        if (!id_lantai) {
            req.flash('error', 'Kode lantai tidak boleh kosong')
            req.flash('data', req.body)
            return res.redirect('/pustakawan/ruangan/buat')
        }

        if (!kode_ruangan) {
            req.flash('error', 'Kode ruangan tidak boleh kosong')
            req.flash('data', req.body)
            return res.redirect('/pustakawan/ruangan/buat')
        }

        const data = {id_lantai, kode_ruangan}

        if (await modelRuangan.checkKodeRuangan(data)) {
            req.flash('error', 'Kode ruangan tidak boleh sama')
            req.flash('data', req.body)
            return res.redirect('/pustakawan/ruangan/buat')
        }

        await modelRuangan.store(data)
        
        req.flash('success', 'Data ruangan berhasil ditambahkan')
        res.redirect('/pustakawan/ruangan')
    } catch(err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/pustakawan/ruangan')
    }
})

router.get('/edit/:id', authPustakawan, async (req, res) => {
    try {
        const {id} = req.params
        const data = await modelRuangan.getById(id)
        const lantai = await modelLantai.getAll()
        const userId = req.session.penggunaId

        const  user = await modelPengguna.getPenggunaById(userId)
        res.render('pengurus/pustakawan/lokasi/ruangan/edit', {data, lantai, user})
    } catch(err) {
        console.log(err)
        req.flash('error', "Data ruangan tidak ditemukan")
        res.redirect('/pustakawan/ruangan')
    }
})

//memgupdate data ruangan berdasarkan id
router.post('/update/:id', authPustakawan, async(req, res) => {
    try {
        const {id} = req.params
        const {kode_ruangan, id_lantai} = req.body

        if (!id_lantai) {
            req.flash('error', 'Kode lantai tidak boleh kosong')
            return res.redirect(`/pustakawan/ruangan/edit/${id}`)
        }

        if (!kode_ruangan) {
            req.flash('error', 'Kode ruangan tidak boleh kosong')
            return res.redirect(`/pustakawan/ruangan/edit/${id}`)
        }
        const data = {kode_ruangan, id_lantai}

        if (await modelRuangan.checkRuangan(data)) {
            req.flash('error', 'Kode ruangan tidak boleh sama')
            return res.redirect(`/pustakawan/ruangan/edit/${id}`)
        }

        await modelRuangan.update(data, id)
        
        req.flash('success', 'Data berhasil diupdate')
        res.redirect('/pustakawan/ruangan')
    } catch(err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/pustakawan/ruangan')
    }
})

//mengapus data ruangan berdasarakn id
router.post('/delete/:id', authPustakawan, async (req, res) => {
    try {
        const {id} = req.params
        
        if (await modelRuangan.checkRakUsed(id)) {
            req.flash("error", "Ruangan masih digunakan oleh rak lain")
            req.flash('data', req.body)
            return res.redirect('/pustakawan/ruangan')
        }
        
        await modelRuangan.delete(id)
        req.flash('success', 'Data ruangan berhasil dihapus')
        res.redirect('/pustakawan/ruangan')
    } catch(err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/pustakawan/ruangan')
    }
})

module.exports = router