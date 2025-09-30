const express = require('express')
const router = express.Router()
const {authManajer} = require('../../middleware/auth')
const modelPengguna = require('../../model/modelPengguna')

router.get('/', authManajer, async (req, res) => {
    try {
        const userId = req.session.penggunaId

        const  user = await modelPengurus.getPengurusById(userId)

        const data = await Modelpengurus.getAccount()
        res.render('pengurus/admin/pengurus/index', {data, user})
    } catch(err) {
        req.flash('error', err.msg)
        res.redirect('/admin/dashboard')
    }
})

router.post('/edit/:id', authManajer, async (req, res) => {
    try {
        const {id} = req.params

        const {status_akun} = req.body
        const data = {status_akun}
        
        req.flash('success', 'Pengrus Behasil Diupdate')
        await Modelpengurus.updateStatusAccount(data, id)
        res.redirect('/admin/pengurus')
    } catch (err) {
        req.flash('error', err.msg)
        res.redirect('/admin/pengurus')
    }
})

router.post('/delete/:id', authManajer, async(req, res) => {
    try{
        const {id} = req.params
        
        await Modelpengurus.deleteAccount(id)

        req.flash('success', 'Pengurus berhasil dihapus')
        res.redirect('/admin/pengurus')
    } catch(err) {
        console.log(err)
        req.flash('error', err.msg)
        res.redirect('/admin/pengurus')
    }
})

module.exports = router