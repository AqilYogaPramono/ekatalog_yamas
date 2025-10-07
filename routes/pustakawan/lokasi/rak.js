const express = require('express')
const router = express.Router()
//import model rak 
const modelRak = require('../../../model/modelRak')
//import model ruangan untuk menampilkan data ruanga
const modelRuangan = require('../../../model/modelRuangan')
const {authPustakawan} = require('../.././../middleware/auth')
const modelPengguna = require('../../../model/modelPengguna')

//menampilakn semua data rak
router.get('/', authPustakawan, async(req, res) => {
    try {
        let data = await modelRak.getAll()

        const userId = req.session.pengurusId

        const  user = await modelPengguna.getPenggunaById(userId)

        res.render('pengurus/pustakawan/lokasi/rak/index', {data, user})
    } catch(err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/pustakawan/dashboard')
    }
})

router.get('/buat', authPustakawan, async (req, res) => {
    try {
        const ruangan = await modelRuangan.getAll()

        const userId = req.session.pengurusId

        const  user = await modelPengguna.getPenggunaById(userId)

        res.render('pengurus/pustakawan/lokasi/rak/buat', {
            ruangan, 
            user,
            data: req.flash('data')[0]
        })
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/pustakawan/rak')
    }
})

//menabahkan data rak baru
router.post('/create', authPustakawan, async(req, res) => {
    try {
        let {id_ruangan, kode_rak} = req.body
        let data = {id_ruangan, kode_rak}

        if (await modelRak.checkRak(data)) {
            req.flash('error', 'Kode Rak sudah ada')
            req.flash('data', req.body)
            return res.redirect('/pustakawan/rak/buat')
        }

        await modelRak.store(data)

        res.redirect('/pustakawan/rak')
    } catch(err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/pustakawan/rak')
    }
})

router.get('/edit/:id', authPustakawan, async (req, res) => {
    try {
        const {id} = req.params
        const rak = await modelRak.getById(id)
        const ruangan = await modelRuangan.getAll()
        const userId = req.session.pengurusId

        const  user = await modelPengguna.getPenggunaById(userId)

        res.render('pengurus/pustakawan/lokasi/rak/edit', {rak, ruangan, user})
    } catch(err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/pustakawan/rak')
    }
})

//memgupdate data rak berdasarkan id
router.post('/update/:id', authPustakawan, async(req, res) => {
    try {
        const {id} = req.params
        const {kode_rak, id_ruangan} = req.body
        const data = {kode_rak, id_ruangan}

        const rak = await modelRak.getById(id)

        if (await modelRak.checkRak(data)) {
            req.flash('error', 'Kode Rak sudah ada')
            return res.redirect(`/pustakawan/rak/edit/${id}`)
        }

        await modelRak.update(data, id)
        
        req.flash('success', 'Data berhasil Diupdate')
        res.redirect('/pustakawan/rak')
    } catch(err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/pustakawan/rak')
    }
})

//mengapus data rak berdasarakn id
router.post('/delete/:id', authPustakawan, async (req, res) => {
    try {
        const {id} = req.params

        await modelRak.delete(id)
        
        req.flash('success', 'Data Berhasil Dihapus')
        res.redirect('/pustakawan/rak')
    } catch(err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/pustakawan/rak')
    }
})

module.exports = router