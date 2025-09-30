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
        const buku = await modelBuku.getAllBukuHapus()

        const userId = req.session.penggunaId

        const  user = await modelPengurus.getPengurusById(userId)

        res.render('pengurus/admin/buku/index', { buku, user })
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/admin/dashboard')
    }
})

router.post('/edit/:id', authManajer, async (req, res) => {
    try {
        const {id} = req.params

        const {status_data} = req.body
        const data = {status_data}

        await modelBuku.updateStatusData(data, id)

        req.flash('success', 'Buku berhasil ditampilkan')
        res.redirect('/admin/buku')
    } catch(err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/admin/buku')
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
        res.redirect('/admin/buku')
    } catch (err) {
        req.flash('error', err.message)
        res.redirect('/admin/buku')
    }
})

module.exports = router