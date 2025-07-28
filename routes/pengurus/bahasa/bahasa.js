var express = require('express')
var router = express.Router()
//import model bahasa 
const modelBahasa = require('../../../model/modelBahasa')

//menampilakn semua data bahasa
router.get('/', async(req, res) => {
    try {
        let data = await modelBahasa.getAll()
        res.render('pengurus/user/bahasa/index', {data})
    } catch(err) {
        req.flash("error", err.message)
        res.redirect('/pengurus/bahasa')
    }
})

//menampilkan halaman untuk menambahkan data bahasa
router.get('/buat', async(req, res) => {
    res.render('pengurus/user/bahasa/buat')
})

//menabahkan data bahasa baru
router.post('/create', async(req, res) => {
    try {
        let {bahasa} = req.body
        if (!bahasa) {
            return req.flash("error", "Nama bahasa tidak boleh kosong")
        }
        let data = {bahasa}
        const checkBahasa = await modelBahasa.checkBahasa(data)
        if (checkBahasa) {
            req.flash("error", "Bahasa Sudah dibuat")
            return res.redirect('/pengurus/bahasa/buat')
        }
        req.flash("success", "Data bahasa berhasil dibuat")
        await modelBahasa.store(data)
        return res.redirect('/pengurus/bahasa')
    } catch(err) {
        req.flash("error", err.message)
        return res.redirect('/pengurus/bahasa')
    }
})

// menampilkan halaman untuk mengedit data bahasa
router.get('/edit/:id', async(req, res) => {
    try {
        const {id} = req.params
        const data = await modelBahasa.getById(id)
        res.render('pengurus/user/bahasa/edit', { data })
    } catch(err) {
        req.flash("error", "Data tidak ditemukan")
        return res.redirect('/pengurus/bahasa')
    }
})

//memperbarui data bahasa berdasarkan id
router.post('/update/:id', async (req, res) => {
    try {
        const {id} = req.params
        let {bahasa} = req.body
        if (!bahasa) {
            req.flash("error", "Nama bahasa tidak boleh kosong")
            return res.redirect(`/pengurus/bahasa/edit/${id}`)
        }
        let data = {bahasa}
        await modelBahasa.update(data, id)
        req.flash("success", "Data bahasa berhasil diperbarui")
        res.redirect('/pengurus/bahasa')
    } catch(err) {
        req.flash("error", err.message)
        return res.redirect('/pengurus/bahasa')
    }
})

//mengapus data bahasa berdasarakn id
router.post('/delete/:id', async (req, res) => {
    try {
        let {id} = req.params
        await modelBahasa.delete(id)
        req.flash("success", "Data bahasa berhasil dihapus")
        res.redirect('/pengurus/bahasa')
    } catch(err) {
        req.flash("error", err.message)
        return res.redirect('/pengurus/bahasa')
    }
})

module.exports = router