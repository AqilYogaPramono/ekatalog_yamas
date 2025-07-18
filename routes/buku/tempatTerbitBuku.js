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

module.exports = router