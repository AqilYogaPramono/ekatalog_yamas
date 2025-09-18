const express = require('express')
const router = express.Router()
const modelBuku = require('../../model/modelBuku')
const path = require('path')
const fs = require('fs')
const {authAdmin} = require('../../middleware/auth')
const modelPengurus = require('../../model/modelPengurus')

const deleteOldPhoto = (oldPhoto) => {
    if (oldPhoto) {
        const filePath = path.join(__dirname, '../../public/images/buku', oldPhoto)
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
    }
}

router.get('/', authAdmin, async (req, res) => {
    try {
        const buku = await modelBuku.getAllBukuHapus()

        const userId = req.session.pengurusId

        const  user = await modelPengurus.getPengurusById(userId)

        res.render('pengurus/admin/buku/index', { buku, user })
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/admin/dashboard')
    }
})

router.post('/edit/:id', authAdmin, async (req, res) => {
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

router.post('/delete/:id', authAdmin, async (req, res) => {
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