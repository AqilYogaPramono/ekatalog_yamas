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


module.exports = router