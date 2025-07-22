const express = require(express)
const router = express.Router()
const modelPengurus = require('../model/modelPengurus')
const bcrypt = require('bcryptjs')

router.post('/login', async(req, res) => {
    try {
        const {email, password} = req.body
        const data = {email, password}

        const pengrus = await modelPengurus.login(data)

        if (!pengrus) {
            req.flash('error', 'Email yang anda masukkan salah')
        }

        if (!(await bcrypt.compare(password, pengrus.password))) {
            req.flash('error', 'Password yang anda masukkan salah')
        }

        req.session.pengurusId = pengrus.id
        if(pengrus.level_pengurus == "pengurus") return res.redirect('/pengurus/dashboards')
        if(pengrus.level_pengurus == "admin") return res.redirect('/admin/dashboard')
        req.flash('success', 'Selamat Datang')
    } catch(err) {
        req.flash('error', err.msg)
    }
})

router.post('/logout', async(req, res) => {
    req.session.destroy(err => {
        if (err) return res.redirect('/')
        res.redirect('/')
    }) 
})

module.exports = router