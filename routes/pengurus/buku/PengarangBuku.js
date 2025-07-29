var express = require('express')
var router = express.Router()
//import model Pengarang Buku
const modelPengarangBuku = require('../../../model/modelPengarangBuku') 

//menampilakn semua data Pengarang Buku
router.get('/', async(req, res) => {
    try {
        const data = await modelPengarangBuku.getAll()
        res.render('pengurus/user/dataMaster/pengarangBuku/index', {data})
    } catch(err) {
        req.flash("error", err.message)
        res.redirect('/pengurus/pengarang-buku')
    }
})

//menampilkan halaman untuk menambahkan data Pengarang Buku
router.get('/buat', async(req, res) => {
    res.render('pengurus/user/dataMaster/pengarangBuku/buat')
})

//menabahkan data Pengarang Buku baru
router.post('/create', async(req, res) => {
    try {
        const {nama_pengarang} = req.body
        const data = {nama_pengarang}
        const checkPengarang = await modelPengarangBuku.checkPengarangBuku(data)
        if (checkPengarang) {
            req.flash("error", "Pengarang Buku Sudah dibuat")
            return res.redirect('/pengurus/pengarang-buku/buat')
        }
        await modelPengarangBuku.store(data)
        console.log(data)
        req.flash("success", "Data Pengarang Buku berhasil ditambahkan")
        res.redirect('/pengurus/pengarang-buku')
    } catch(err) {
        console.log(err)
        req.flash("error", err.message)
        return res.redirect('/pengurus/pengarang-buku')
    }
})

// menampilkan halaman untuk mengedit data pengarang buku
router.get('/edit/:id', async(req, res) => {
    try {
        const {id} = req.params
        const data = await modelPengarangBuku.getById(id)
        res.render('pengurus/user/dataMaster/pengarangBuku/edit', { data })
    } catch(err) {
        req.flash("error", err.message)
        return res.redirect('/pengurus/pengarang-buku')
    }
})

//memperbarui data pengarang buku berdasarkan id
router.post('/update/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {nama_pengarang} = req.body
        const data = {nama_pengarang}
        await modelPengarangBuku.update(data, id)
        req.flash("success", "Data pengarang buku berhasil diperbarui")
        res.redirect('/pengurus/pengarang-buku')
    } catch(err) {
        req.flash("error", err.message)
        return res.redirect('/pengurus/pengarang-buku')
    }
})

//mengapus data pengarang buku berdasarkan id
router.post('/delete/:id', async (req, res) => {
    try {
        const {id} = req.params
        await modelPengarangBuku.delete(id)
        req.flash("success", "Data pengarang buku berhasil dihapus")
        res.redirect('/pengurus/pengarang-buku')
    } catch(err) {
        req.flash("error", err.message)
        return res.redirect('/pengurus/pengarang-buku')
    }
})

module.exports = router