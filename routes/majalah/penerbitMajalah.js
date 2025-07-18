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
module.exports = router