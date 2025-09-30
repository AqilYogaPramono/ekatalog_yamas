const express = require('express')
const router = express.Router()
const modelMajalah = require('../../model/modelMajalah')
const path = require('path')
const fs = require('fs')
const {authManajer} = require('../../middleware/auth')
const modelPengguna = require('../../model/modelPengguna')

const deleteOldPhoto = (oldPhoto) => {
    if (oldPhoto) {
        const filePath = path.join(__dirname, '../../public/images/majalah', oldPhoto)
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
    }
}

router.get('/', authManajer, async (req, res) => {
    try {
        const userId = req.session.pengurusId

        const  user = await modelPengurus.getPengurusById(userId)

        const majalah = await modelMajalah.getAllBukuHapus()

        res.render('pengurus/admin/majalah/index', { majalah, user })
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

        await modelMajalah.updateStatusData(data, id)

        req.flash('success', 'Majalah berhasil ditampilkan')
        res.redirect('/admin/majalah')
    } catch(err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/admin/majalah')
    }
})

router.post('/delete/:id', authManajer, async (req, res) => {
    try {
        const { id } = req.params
        
        const majalah = await modelMajalah.getById(id)
        const oldPhoto = majalah.foto_cover

        deleteOldPhoto(oldPhoto)
        await modelMajalah.hardDelete(id)

        req.flash('success', 'Majalah berhasil dihapus')
        res.redirect('/admin/majalah')
    } catch (err) {
        req.flash('error', err.message)
        res.redirect('/admin/majalah')
    }
})

module.exports = router