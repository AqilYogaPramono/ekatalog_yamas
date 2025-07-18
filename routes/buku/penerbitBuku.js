var express = require('express')
var router = express.Router()
const modelPenerbitBuku = require('../../model/modelPenerbitBuku')

router.get('/', async(req, res) => {
    try {
        let data = await modelPenerbitBuku()
        res.render('pengurus/user/penerbitBuku')
    } catch(err) {
        req.flash(err)
    }
})

router.post('/buat', async(req, res) => {
    try {
        let {namaPenerbit} = req.body
        let data = namaPenerbit
        await modelPenerbitBuku.store(data)
        res.render('pengurus/user/penerbit')
    } catch {
        req.flash(err)
    }
})

module.export = router