const express = require('express')
const router = express.Router()
//import model lantai 
const modelLantai = require('../../../model/modelLantai')

//menampilakn semua data lantai
router.get('/', async (req, res) => {
    try {
        let data = modelLantai.getAll()
        res.render('pengurus/user/lokasi/lantai/index', {data})
    } catch(err) {
        req.flash(err)
    }
})

//menabahkan data lantai baru
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

//memgupdate data lantai berdasarkan id
router.post('/edit/:id', async (req, res) => {
    try {
        let id = req.params
        let {kodeLantai} = req.body
        let data = kodeLantai
        await modelLantai.update(data, id)
        res.render('pengurus/user/lokasi/lantai/index')
    } catch (err) {
        req.flash(err)
    }
})

//mengapus data lantai berdasarakn id
router.post('/delete', async (req, res) => {
    try {
        let id = req.params
        await modelLantai.delete(id)
        res.render('pengurus/user/lokasi/lantai/index')
    } catch(err) {
        req.flash(err)
    }
})

module.exports = router