const express = require('express')
const router = express.Router()
//import model ruangan 
const modelRuangan = require('../../model/modelRuangan')

//menampilakn semua data ruangan
router.get('/', async(req, res) => {
    try {
        let data = modelRuangan.getAll()
        res.render('pengurus/user/lokasi/ruangan/index')
    } catch(err) {
        req.flash(err)
    }
})

//menabahkan data ruangan baru
router.post('/buat', async(req, res) => {
    try {
        let {kodeRuagan, idLantai} = req.body
        let data = {kodeRuagan, idLantai}
        await modelRuangan.store(data)
        res.render('pengurus/user/lokasi/ruangan/index')
    } catch(err) {
        req.flash(err)
    }
})

//memgupdate data ruangan berdasarkan id
router.post('/edit/:id', async(req, res) => {
    try {
        let id = req.params
        let {kodeRuagan, idLantai} = req.body
        await modelRuangan.update(data, id)
        res.render('pengurus/user/lokasi/ruangan/index')
    } catch(err) {
        req.flash(err)
    }
})

//mengapus data ruangan berdasarakn id
router.post('/delete/:id', async (req, res) => {
    try {
        let id = req.params
        await modelRuangan.delete(id)
        res.render('pengurus/user/lokasi/ruangan/index')
    } catch(err) {
        req.flash(err)
    }
})

module.exports = router