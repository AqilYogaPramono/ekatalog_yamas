const express = require('express')
const router = express.Router()
//import model tempat terbit majalah 
const modelTempatterbitMajalah = require('../../../model/modelTempatTerbitMajalah')

//menampilakn semua data tempat terbit majalah
router.get('/', async (req, res) => {
    try {
        let data = await modelTempatterbitMajalah.getAll()
        res.render('pengurus/user/majalah/tempatTerbitMajalah/index')
    } catch(err) {
        req.flash(err)
    }
})

//menabahkan data tempat terbit majalah baru
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

//memgupdate data tempat terbit majalah berdasarkan id
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

//mengapus data tempat terbit majalah berdasarakn id
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