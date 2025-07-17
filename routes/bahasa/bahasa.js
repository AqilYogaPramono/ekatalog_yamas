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



module.exports = routes
