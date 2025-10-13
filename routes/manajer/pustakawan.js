const express = require('express')
const router = express.Router()
// import model pengguna
const modelPengguna = require('../../model/modelPengguna')
// import middleware untuk mengecek peran pengguna login
const {authManajer} = require('../../middleware/auth')

router.get('/', authManajer, async (req, res) => {
    try {
        // mendapatkan id pengguna dari session
        const userId = req.session.penggunaId
        const user = await modelPengguna.getNamaPenggunaById(userId)

        // mendapatkan data pustakawan
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
        // mengambil id dari params
        const {id} = req.params
        // mengambil status akun dari body
        const {status_akun} = req.body
        // menyimpan data yang diinputkan user
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
        // mengambil id dari params
        const {id} = req.params
        
        // menghapus akun pustakawan
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