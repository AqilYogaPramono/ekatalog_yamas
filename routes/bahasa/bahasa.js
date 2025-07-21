var express = require('express')
var router = express.Router()
//import model bahasa 
const modelBahasa = require('../../model/modelBahasa')

//menampilakn semua data bahasa
router.get('/', async(req, res) => {
    try {
        let data = await modelBahasa.getAll()
        res.render('pengurus/user/bahasa/index', {data})
    } catch(err) {
        req.flash('error', err.message)
    }
})

//menabahkan data bahasa baru
router.post('/buat', async(req, res) => {
    try {
        let {bahasa} = req.body
        let data = {bahasa}
        await modelBahasa.store(data)
        res.redirect('pengurus/user/bahasa/bahasa')
    } catch {
        req.flash(err)
    }
})

//memgupdate data bahasa berdasarkan id
router.post('udpate/:id', async (req, res) => {
    try {
        let id = req.params
        let {bahasa} = req.body
        let data = {bahasa}
        await modelBahasa.update(data, id)
        res.render('/pengurus/user/bahasa/bahasa')
    } catch {
        req.flash(err)
    }
})

//mengapus data bahasa berdasarakn id
router.post('/delete/:id', async (req, res) => {
    try {
        let id = req.params
        await modelBahasa.delete(id)
        res.redirect('/pengurus/user/bahasa/bahasa')
    } catch {
        req.flash(err)
    }
})

module.exports = router
