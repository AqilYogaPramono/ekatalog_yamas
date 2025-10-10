const express = require('express')
const router = express.Router()
const modelBuku = require('../../model/modelBuku')
const path = require('path')
const fs = require('fs')
const {authManajer} = require('../../middleware/auth')
const modelPengguna = require('../../model/modelPengguna')

const deleteOldPhoto = (oldPhoto) => {
    if (oldPhoto) {
        const filePath = path.join(__dirname, '../../public/images/buku', oldPhoto)
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
    }
}

router.get('/', authManajer, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = 20
        const offset = (page - 1) * limit

        const buku = await modelBuku.getBukuHapus(limit, offset)
        const totalBuku = buku.length
        const totalHalaman = Math.ceil(totalBuku / limit)

        const userId = req.session.penggunaId
        const  user = await modelPengguna.getPenggunaById(userId)

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

        const userId = req.session.penggunaId
        const  user = await modelPengguna.getPenggunaById(userId)

        const buku = await modelBuku.searchJudulBukuHapus(judul)

        res.render('pengurus/manajer/buku/index', {buku, user})
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/manajer/dashboard')
    }
})

router.get('/:id', authManajer, async (req, res) => {
    try {
        const {id} = req.params
        const userId = req.session.penggunaId
        const  user = await modelPengguna.getPenggunaById(userId)

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
        const {id} = req.params

        const {status_data} = req.body
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
        const {id} = req.params

        const buku = await modelBuku.getByIdHapus(id)
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