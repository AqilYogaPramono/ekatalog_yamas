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

router.post('/buat', async (req, res) => {
    try {
        const {nama, email} = req.body
        const password = process.env.PW_PGR
        const data = {nama, email, password}
        await Modelpengurus.storeAccount(data)
        res.render('/pengurus/admin/pengurus/index')
    } catch(err) {
        req.flash('error', err.msg)
    }
})

module.exports = router