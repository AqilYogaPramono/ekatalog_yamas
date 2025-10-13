const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')
// import model buku
const modelBuku = require('../../model/modelBuku')
// import model pengguna
const modelPengguna = require('../../model/modelPengguna')
// import middleware untuk mengecek peran pengguna login
const {authManajer} = require('../../middleware/auth')

const deleteOldPhoto = (oldPhoto) => {
    if (oldPhoto) {
        const filePath = path.join(__dirname, '../../public/images/buku', oldPhoto)
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
    }
}

router.get('/', authManajer, async (req, res) => {
    try {
        // mendapatkan id pengguna dari session
        const userId = req.session.penggunaId
        const user = await modelPengguna.getNamaPenggunaById(userId)

        const flashedKeyword = req.flash('keyword')[0]
        const page = parseInt(req.query.page) || 1
        const limit = 20
        const offset = (page - 1) * limit

        if (flashedKeyword) {
            const buku = await modelBuku.searchJudulBukuHapus(flashedKeyword)
            const totalBuku = buku.length
            const totalHalaman = 1
            return res.render('pengurus/manajer/buku/index', {buku, user, page: 1, totalHalaman, keyword: flashedKeyword})
        }

        const buku = await modelBuku.getBukuHapus(limit, offset)
        const totalBuku = buku.length
        const totalHalaman = Math.ceil(totalBuku / limit)

        res.render('pengurus/manajer/buku/index', { buku, user, page, totalHalaman })
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/manajer/dashboard')
    }
})

router.post('/search', authManajer, async (req, res) => {
    try {
        const {judul} = req.body
        req.flash('keyword', judul)
        return res.redirect('/manajer/buku')
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/manajer/dashboard')
    }
})

router.get('/:id', authManajer, async (req, res) => {
    try {
        const {id} = req.params
        // mendapatkan id pengguna dari session
        const userId = req.session.penggunaId
        const user = await modelPengguna.getNamaPenggunaById(userId)

        const buku = await modelBuku.getByIdHapus(id)

        res.render('pengurus/manajer/buku/detail', { buku, user })
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/manajer/buku')
    }
})

router.post('/edit/:id', authManajer, async (req, res) => {
    try {
        // mengambil id dari params
        const {id} = req.params
        // mengambil status data dari body
        const {status_data} = req.body
        // menyimpan data yang diinputkan user
        const data = {status_data}

        await modelBuku.updateStatusData(data, id)

        req.flash('success', 'Buku berhasil ditampilkan')
        res.redirect('/manajer/buku')
    } catch(err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/manajer/buku')
    }
})

router.post('/delete/:id', authManajer, async (req, res) => {
    try {
        // mengambil id dari params
        const {id} = req.params

        const buku = await modelBuku.getCoverByIdHapus(id)
        const oldPhoto = buku.foto_cover
        deleteOldPhoto(oldPhoto)
        
        await modelBuku.hardDelete(id)
        
        req.flash('success', 'Buku berhasil dihapus')
        res.redirect('/manajer/buku')
    } catch (err) {
        req.flash('error', err.message)
        res.redirect('/manajer/buku')
    }
})

module.exports = router