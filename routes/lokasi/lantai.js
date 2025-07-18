const express = require('express')
const router = express.Router()
const modelLantai = require('../../model/modelLantai')

router.get('/', async (req, res) => {
    try {
        let data = modelLantai.getAll()
        res.render('pengurus/user/lokasi/lantai/index', {data})
    } catch(err) {
        req.flash(err)
    }
})

router.post('/buat', async (req, res) => {
    try {
        let {kodeLantai} = req.body
        let data = kodeLantai
        await modelLantai.store(data)
        res.render('pengurus/user/lokasi/lantai/index')
    } catch(err) {
        req.flash(err)
    }
})

module.exports = router