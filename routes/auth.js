const express = require(express)
const router = express.Router()
const modelPengurus = require('../model/modelPengurus')

router.post('/register', async(req, res) => {
    try {
        const {nama, email, pasword} = req.body
        const data = {nama, email, pasword}

        const checkEmail = await modelPengurus.checkEmail(data)
        if (length.checkEmail > 0) {
            req.flash('error', 'Email telah digunakan')
        }

        await modelPengurus.register(data)
        req.flash('success', 'Akun berhasil terbuat')
        res.redirect('/login')
    } catch(err) {
        req.flash('error', err.msg)
    }
})

module.exports = router