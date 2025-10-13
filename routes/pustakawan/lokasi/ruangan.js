const express = require('express')
const router = express.Router()
//import model ruangan 
const modelRuangan = require('../../../model/modelRuangan')
//import model lantai
const modelLantai = require('../../../model/modelLantai')
//import model pengguna
const modelPengguna = require('../../../model/modelPengguna')
// import middleware untuk mengecek peran pengguna login
const {authPustakawan} = require('../.././../middleware/auth')

//menampilakn semua data ruangan
router.get('/', authPustakawan, async(req, res) => {
    try {
        // mendapatkan id pengguna dari session
        const userId = req.session.penggunaId
        const user = await modelPengguna.getNamaPenggunaById(userId)

        // mengabil semua data ruangan
        const data = await modelRuangan.getAll()

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
        // mendapatkan id pengguna dari session
        const userId = req.session.penggunaId
        const user = await modelPengguna.getNamaPenggunaById(userId)

        // mengambil semua data lantai
        const lantai = await modelLantai.getAll()

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
        // destructuring req.body
        const {id_lantai, kode_ruangan} = req.body
        // menyimpan data yang diinputkan user
        const data = {id_lantai, kode_ruangan}

        // input id lantai tidak boleh kosong
        if (!data.id_lantai) {
            req.flash('error', 'Kode lantai tidak boleh kosong')
            req.flash('data', req.body)
            return res.redirect('/pustakawan/ruangan/buat')
        }

        // input kode ruangan tidak boleh kosong
        if (!data.kode_ruangan) {
            req.flash('error', 'Kode ruangan tidak boleh kosong')
            req.flash('data', req.body)
            return res.redirect('/pustakawan/ruangan/buat')
        }

        // memeriksa apakah kode ruangan sudah ada
        if (await modelRuangan.checkKodeRuanganCreate(data)) {
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
        // destructuring req.params
        const {id} = req.params
        // mendapatkan id pengguna dari session
        const userId = req.session.penggunaId
        const user = await modelPengguna.getNamaPenggunaById(userId)

        // mengambil data ruanagn berdasarakn id
        const data = await modelRuangan.getById(id)

        // mengambil semua data lantai
        const lantai = await modelLantai.getAll()

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
        // destructuring req.params
        const {id} = req.params

        // destructuring req.body
        const {kode_ruangan, id_lantai} = req.body

        // menyimpan data yang diinputkan user
        const data = {kode_ruangan, id_lantai}

        // input id lantai tidak boleh kosong
        if (!data.id_lantai) {
            req.flash('error', 'Kode lantai tidak boleh kosong')
            return res.redirect(`/pustakawan/ruangan/edit/${id}`)
        }

        // input kode ruangan tidak boleh kosong
        if (!data.kode_ruangan) {
            req.flash('error', 'Kode ruangan tidak boleh kosong')
            return res.redirect(`/pustakawan/ruangan/edit/${id}`)
        }

        // memeriksa apakah kode ruangan tidak boleh sama
        if (await modelRuangan.checkRuanganUpdate(data, id)) {
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
        // destructuring req.params
        const {id} = req.params
        
        // mengecek apakah ruangan sudah digunakan
        if (await modelRuangan.checkRakUsed(id)) {
            req.flash("error", "Ruangan masih digunakan oleh rak lain")
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