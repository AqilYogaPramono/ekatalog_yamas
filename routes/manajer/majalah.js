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
        const page = parseInt(req.query.page) || 1
        const limit = 20
        const offset = (page - 1) * limit

        const userId = req.session.penggunaId

        const  user = await modelPengguna.getPenggunaById(userId)

        const majalah = await modelMajalah.getMajalahHapus(limit, offset)
        const totalMajalah = majalah.length
        const totalHalaman = Math.ceil(totalMajalah / limit)

        res.render('pengurus/manajer/majalah/index', { majalah, user, page, totalHalaman })
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/manajer/majalah')
    }
})

router.post('/search', authManajer, async (req, res) => {
    try {
        const {judul} = req.body

        const userId = req.session.penggunaId
        const  user = await modelPengguna.getPenggunaById(userId)

        const majalah = await modelMajalah.searchJudulMajalahHapus(judul)

        res.render('pengurus/manajer/majalah/index', { majalah, user })
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/manajer/majalah')
    }
})

router.get('/:id', authManajer, async (req, res) => {
    try {
        const {id} = req.params
        const userId = req.session.penggunaId
        const  user = await modelPengguna.getPenggunaById(userId)
        
        const majalah = await modelMajalah.getByIdHapus(id)

        res.render('pengurus/manajer/majalah/detail', { majalah, user })
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/manajer/majalah')
    }
})

router.post('/edit/:id', authManajer, async (req, res) => {
    try {
        const {id} = req.params
        
        const {status_data} = req.body
        const data = {status_data}

        await modelMajalah.updateStatusData(data, id)

        req.flash('success', 'Majalah berhasil ditampilkan')
        res.redirect('/manajer/majalah')
    } catch(err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/manajer/majalah')
    }
})

router.post('/delete/:id', authManajer, async (req, res) => {
    try {
        const { id } = req.params
        
        const majalah = await modelMajalah.getByIdHapus(id)
        const oldPhoto = majalah.foto_cover

        deleteOldPhoto(oldPhoto)
        await modelMajalah.hardDelete(id)

        req.flash('success', 'Majalah berhasil dihapus')
        res.redirect('/manajer/majalah')
    } catch (err) {
        req.flash('error', err.message)
        res.redirect('/manajer/majalah')
    }
})

module.exports = router