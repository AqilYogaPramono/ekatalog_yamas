const express = require('express')
const router = express.Router()
const Modelpengurus = require('../../model/modelPengurus')

router.get('/', async (req, res) => {
    try {
        const data = await Modelpengurus.getAccount()
        res.render('/pengurus/admin/pengurus/index', {data})
    } catch(err) {
        req.flash('error', err.msg)
    }
})

module.exports = router