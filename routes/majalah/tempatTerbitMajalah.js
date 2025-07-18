const express = require('express')
const router = express.Router()
const modelTempatterbitMajalah = require('../../model/modelTempatTerbitMajalah')

router.get('/', async (req, res) => {
    try {
        let data = await modelTempatterbitMajalah.getAll()
        res.render('pengurus/user/majalah/tempatTerbitMajalah/index')
    } catch(err) {
        req.flash(err)
    }
})

router.post('/buat', async (req, res) => {
    try {
        let {namaTempatTerbit} = req.body
        let data = namaTempatTerbit
        await modelTempatterbitMajalah.store(data)
        res.render('pengurus/user/majalah/tempatTerbitMajalah/index')
    } catch(err) {
        req.flash(err)
    }
})

router.post('/edit/:id', async (req, res) => {
    try {
        let id = req.params
        let {namaPenerbit} = req.body
        let data = namaPenerbit
        await modelTempatterbitMajalah.update(data,id)
        res.render('pengurus/user/majalah/tempattrbitMajalah/index')
    } catch(err) {
        req.flash(err)
    }
})

router.post('delete/:id', async (req, res) => {
    try {
        let id = req.params
        await modelTempatterbitMajalah.delete(id)
        res.render('pegurus/user/majalah/tempatTerbitMajalah/index')
    } catch(err) {
        req.flash(err)
    }
})

module.exports = router