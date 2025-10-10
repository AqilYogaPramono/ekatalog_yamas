const express = require('express')
const router = express.Router()
const {authManajer} = require('../../middleware/auth')
const modelPengguna = require('../../model/modelPengguna')

router.get('/', authManajer, async (req, res) => {
    try {
        const userId = req.session.penggunaId

        const  user = await modelPengguna.getPenggunaById(userId)

        const data = await modelPengguna.getAccount()
        res.render('pengurus/manajer/pengurus/index', {data, user})
    } catch(err) {
        console.log(err)
        req.flash('error', err.msg)
        res.redirect('/manajer/dashboard')
    }
})

router.post('/edit/:id', authManajer, async (req, res) => {
    try {
        const {id} = req.params

        const {status_akun} = req.body
        const data = {status_akun}
        
        await modelPengguna.updateStatusAccount(data, id)
        req.flash('success', 'Pustakawan Berhasil Diupdate')
        res.redirect('/manajer/pustakawan')
    } catch (err) {
        console.log(err)
        req.flash('error', err.msg)
        res.redirect('/manajer/pustakawan')
    }
})

router.post('/delete/:id', authManajer, async(req, res) => {
    try{
        const {id} = req.params
        
        await modelPengguna.deleteAccount(id)

        req.flash('success', 'Pustakawan berhasil dihapus')
        res.redirect('/manajer/pustakawan')
    } catch(err) {
        console.log(err)
        req.flash('error', err.msg)
        res.redirect('/manajer/pustakawan')
    }
})

module.exports = router