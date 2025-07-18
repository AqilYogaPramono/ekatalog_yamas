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

module.export = router