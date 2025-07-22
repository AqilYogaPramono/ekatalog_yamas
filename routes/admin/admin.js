const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
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
        const passwordRaw = process.env.PW_PGR
        const data = {nama, email}
        await Modelpengurus.storeAccount(data, passwordRaw)
        res.render('/pengurus/admin/pengurus/index')
    } catch(err) {
        req.flash('error', err.msg)
    }
})

router.post('/delete/:id', async(req, res) => {
    try{
        const id = req.params
        await Modelpengurus.deleteAccount(id)
        res.render('/pengurus/admin/pengurus/index')
    } catch(err) {
        req.flash('error', err.msg)
    }
})

module.exports = router