var express = require('express')
var routes = express.Router()
const modelBahasa = require('../../model/modelBahasa')

routes.get('/', async(req, res) => {
    try {
        let data = await modelBahasa.getAll()
    res.render(`pengurus/user/bahsa/index`, {data})
    } catch(err) {
        req.flash(err)
    }
})

routes.post('/buat', async(req, res) => {
    try {
        let {bahasa} = req.body
        let data = {bahasa}
        await modelBahasa.store(data)
        res.redirect('pengurus/user/bahasa/bahasa')
    } catch {
        req.flash(err)
    }
})

routes.post('udpate/:id', async (req, res) => {
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

routes.post('/delete/:id', async (req, res) => {
    try {
        let id = req.params
        await modelBahasa.delete(id)
        res.redirect('/pengurus/user/bahasa/bahasa')
    } catch {
        req.flash(err)
    }
})

module.exports = routes
