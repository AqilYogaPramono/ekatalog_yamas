const express = require('express')
const router = express.Router()
const modelRak = require('../../model/modelRak')


router.get('/', async(req, res) => {
    try {
        let data = modelRak.getAll()
        res.render('pengurus/user/lokasi/rak/index')
    } catch(err) {
        req.flash(err)
    }
})

router.post('/buat', async(req, res) => {
    try {
        let {kodeRak, idRuangan} = req.body
        let data = {kodeRak, idRuangan}
        await modelRak.store(data)
        res.render('pengurus/user/lokasi/rak/index')
    } catch(err) {
        req.flash(err)
    }
})

module.exports = router