const express = require('express')
const router = express.Router()
const modelpenerbitMajalah = require('../../model/modelMajalah')

router.get('/', async (req, res) => {
    try {
        let data = await modelpenerbitMajalah.getAll()
        res.render('pengrus/user/majalah/penerbitMajalah/index')
    } catch(err) {
        req.flash(err)
    }
})

router.post('/buat', async(req, res) => {
    try {
        let {namaPenerbit} = req.body
        let data = namaPenerbit
        await modelpenerbitMajalah.store(data)
        res.render('pengurus/user/majalah/penerbitMajalah/index')
    } catch(err) {
        req.flash(err)
    }
})

router.post('/edit/:id', async(req, res) => {
    try {
        let id = req.params
        let {namaPenerbit} = req.body
        let data = namaPenerbit
        await modelpenerbitMajalah.update(data, id)
        res.render('pengurus/user/majalah/penerbitmajalah/index')
    } catch(err) {
        req.flash(err)
    }
})

router.post('delete/:id', async(req, res) => {
    try {
        let id = req.params
        await modelpenerbitMajalah.delete(id)
        res.render('pengurus/user/majalah/penerbitMajalah/index')
    } catch(err) {
        req.flash(err)
    }
})

module.exports = router