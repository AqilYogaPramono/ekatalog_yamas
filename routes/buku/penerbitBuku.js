var express = require('express')
var router = express.Router()
//import model penerbit buku 
const modelPenerbitBuku = require('../../model/modelPenerbitBuku')

//menampilakn semua data penerbit buku
router.get('/', async(req, res) => {
    try {
        let data = await modelPenerbitBuku()
        res.render('pengurus/user/penerbitBuku/index')
    } catch(err) {
        req.flash(err)
    }
})

//menabahkan data penerbit buku baru
router.post('/buat', async(req, res) => {
    try {
        let {namaPenerbit} = req.body
        let data = namaPenerbit
        await modelPenerbitBuku.store(data)
        res.render('pengurus/user/penerbitBuku/index')
    } catch {
        req.flash(err)
    }
})

//memgupdate data penerbit buku berdasarkan id
router.post('/edit', async(req, res) => {
    try {
        let id = req.params
        let {namaPenerbit} = req.body
        let data = namaPenerbit
        await modelPenerbitBuku.update(id, data)
        res.render('pengurus/user/penerbitBuku/index')
    } catch(err) {
        req.flash(err)
    }
})

//mengapus data penerbit buku berdasarakn id
router.post('/delete', async(req,res) => {
    try {
        let id = req.params
        await modelPenerbitBuku.delete(id)
        res.render('pengrus/user/penerbitBuku/index')
    } catch(err) {
        req.flash(err)
    } 
})

module.exports = router