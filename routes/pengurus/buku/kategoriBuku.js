var express = require('express')
var router = express.Router()
//import model kategori buku 
const modelKategoriBuku = require('../../../model/modelKategoriBuku')

//menampilkan semua data kategori buku
router.get('/', async(req, res) => {
    try {
        const data = await modelKategoriBuku.getAll()
        res.render('pengurus/user/dataMaster/kategoriBuku/index', {data})
    } catch(err) {
        req.flash("error", err.message)
        res.redirect('/pengurus/kategori-buku')
    }
})

//menampilkan halaman untuk menambahkan data kategori buku
router.get('/buat', async(req, res) => {
    res.render('pengurus/user/dataMaster/kategoriBuku/buat')
})

//menabahkan data kategori buku baru
router.post('/create', async(req, res) => {
    try {
        const {nama_kategori} = req.body
        const data = {nama_kategori}
        const checkKategori = await modelKategoriBuku.checkKategoriBuku(data)
        if (checkKategori) {
            req.flash("error", "Kategori Buku Sudah dibuat")
            return res.redirect('/pengurus/kategori-buku/buat')
        }
        await modelKategoriBuku.store(data)
        console.log(data)
        req.flash("success", "Data kategori buku berhasil ditambahkan")
        res.redirect('/pengurus/kategori-buku')
    } catch(err) {
        req.flash("error", err.message)
        return res.redirect('/pengurus/kategori-buku')
    }
})

// menampilkan halaman untuk mengedit data kategori buku
router.get('/edit/:id', async(req, res) => {
    try {
        const {id} = req.params
        const data = await modelKategoriBuku.getById(id)
        res.render('pengurus/user/dataMaster/kategoriBuku/edit', { data })
    } catch(err) {
        req.flash("error", err.message)
        return res.redirect('/pengurus/kategori-buku')
    }
})

//memperbarui data kategori buku berdasarkan id
router.post('/update/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {nama_kategori} = req.body
        const data = {nama_kategori}
        const checkKategori = await modelKategoriBuku.checkKategoriBuku(data)
        if (checkKategori) {
            req.flash("error", "Kategori Buku Sudah dibuat")
            return res.redirect('/pengurus/kategori-buku/buat')
        }
        await modelKategoriBuku.update(data, id)
        req.flash("success", "Data kategori buku berhasil diperbarui")
        res.redirect('/pengurus/kategori-buku')
    } catch(err) {
        req.flash("error", err.message)
        return res.redirect('/pengurus/kategori-buku')
    }
})

//mengapus data kategori buku berdasarakn id
router.post('/delete/:id', async (req, res) => {
    try {
        const {id} = req.params
        await modelKategoriBuku.delete(id)
        req.flash("success", "Data kategori buku berhasil dihapus")
        res.redirect('/pengurus/kategori-buku')
    } catch(err) {
        req.flash("error", err.message)
        return res.redirect('/pengurus/kategori-buku')
    }
})

module.exports = router