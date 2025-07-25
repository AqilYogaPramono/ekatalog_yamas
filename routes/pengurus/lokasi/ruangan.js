const express = require('express')
const router = express.Router()
//import model ruangan 
const modelRuangan = require('../../../model/modelRuangan')

//menampilakn semua data ruangan
router.get('/', async(req, res) => {
    try {
        const data = await modelRuangan.getAll()
        res.render('pengurus/user/lokasi/ruangan/index', {data})
    } catch(err) {
        req.flash(err)
    }
})

//menabahkan data ruangan baru
router.post('/buat', async(req, res) => {
    try {
        const {kodeRuagan, idLantai} = req.body
        const data = {kodeRuagan, idLantai}
        await modelRuangan.store(data)
        res.render('pengurus/user/lokasi/ruangan/index')
    } catch(err) {
        req.flash(err)
    }
})

//memgupdate data ruangan berdasarkan id
router.post('/edit/:id', async(req, res) => {
    try {
        const {id} = req.params
        const {kodeRuagan, idLantai} = req.body
        const data = {kodeRuagan, idLantai}
        await modelRuangan.update(data, id)
        res.render('pengurus/user/lokasi/ruangan/index')
    } catch(err) {
        req.flash(err)
    }
})

//mengapus data ruangan berdasarakn id
router.post('/delete/:id', async (req, res) => {
    try {
        const id = req.params
        await modelRuangan.delete(id)
        res.render('pengurus/user/lokasi/ruangan/index')
    } catch(err) {
        req.flash(err)
    }
})

module.exports = router