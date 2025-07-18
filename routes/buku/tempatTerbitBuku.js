var express = require('express')
var router = express.Router()
const modelTempatTerbitBuku = require('../../model/modelTempatTerbitBuku')

router.get('/', async (req, res) => {
    try {
        let data = await modelTempatTerbitBuku.getAll()
        res.render('pengurus/user/tempatTerbitBuku/index', {data})
    } catch(err) {
        req.flash(err)
    }
})

router.post('/buat', async (req, res) => {
    try {
        let {namaTempatTerbit} = req.body
        let data = namaTempatTerbit
        await modelTempatTerbitBuku.store(data)
        res.render('pengurus/user/tempatTerbitBuku/index')
    } catch(err) {
        req.flash(err)
    }
})

router.post('/edit/:id', async (req, res) => {
    try {
        let id = req.params
        let {namaTempatTerbit} = req.body
        let data = namaTempatTerbit
        await modelTempatTerbitBuku.update(data, id)
        res.render('pengrus/user/tempatTerbitBuku/index')
    } catch {
        req.flash(err)
    }
})

module.exports = router