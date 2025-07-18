const express = require('express')
const router = express.Router()
const modelTempatterbitMajalah = require('../../model/modelTempatTerbitMajalah')

router.get('/', async (req, res) => {
    try {
        let data = await modelTempatterbitMajalah.getAll()
    } catch(err) {
        req.flash(err)
    }
})

module.exports = router