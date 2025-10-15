const express = require('express')
const router = express.Router()
// import model penerbit koran 
const modelPenerbitKoran = require('../../../model/modelPenerbitKoran')
// import model pengguna
const modelPengguna = require('../../../model/modelPengguna')
// import middleware untuk mengecek peran pengguna login
const {authPustakawan} = require('../.././../middleware/auth')


router.get('/', authPustakawan, async (req, res) => {
    try {
        // mendapatkan id pengguna dari session
        const userId = req.session.penggunaId
        const user = await modelPengguna.getNamaPenggunaById(userId)

        const penerbitKoran = await modelPenerbitKoran.getAll()

        res.render('pengurus/pustakawan/koran/penerbitKoran/index', {penerbitKoran, user})
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/pustakawan/dashboard')
    }
})

router.get('/buat', authPustakawan, async (req, res) => {
    try {
        // mendapatkan id pengguna dari session
        const userId = req.session.penggunaId
        const user = await modelPengguna.getNamaPenggunaById(userId)

        res.render('pengurus/pustakawan/koran/penerbitKoran/buat', {
            user,
            data: req.flash('data')[0]
        })
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/pustakawan/penerbit-koran')
    }
})

router.post('/create', authPustakawan, async (req, res) => {
    try {
        const {nama_penerbit} = req.body
        const data = {nama_penerbit}
        
        if (!data.nama_penerbit) {
            req.flash("error", "Penerbit Koran tidak boleh kosong")
            req.flash('data', req.body)
            return res.redirect('/pustakawan/penerbit-koran/buat')
        }

        if (await modelPenerbitKoran.checkPenerbitKoranCreate(data)) {
            req.flash("error", "Penerbit Koran sudah dibuat")
            req.flash('data', req.body)
            return res.redirect('/pustakawan/penerbit-koran/buat')
        }

        await modelPenerbitKoran.store(data)
        req.flash('success', 'Data Berhasil ditambahkan')
        res.redirect('/pustakawan/penerbit-koran')
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/pustakawan/penerbit-koran')
    }
})

router.get('/edit/:id', authPustakawan, async (req, res) => {
    try {
        const {id} = req.params
        // mendapatkan id pengguna dari session
        const userId = req.session.penggunaId
        const user = await modelPengguna.getNamaPenggunaById(userId)

        const penerbitKoran = await modelPenerbitKoran.getById(id)
        console.log(penerbitKoran)

        res.render('pengurus/pustakawan/koran/penerbitKoran/edit', {
            user,
            penerbitKoran,
            data: req.flash('data')[0]
        })

    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/pustakawan/penerbit-koran')
    }
})

router.post('/update/:id', authPustakawan, async (req, res) => {
    try {
        const {id} = req.params
        const {nama_penerbit} = req.body
        const data = {nama_penerbit}

        if (!data.nama_penerbit) {
            req.flash("error", "Penerbit Koran tidak boleh kosong")
            req.flash('data', req.body)
            return res.redirect(`/pustakawan/penerbit-koran/edit/${id}`)
        }

        if (await modelPenerbitKoran.checkPenerbitKoranUpdate(data, id)) {
            req.flash("error", "Penerbit Koran sudah dibuat")
            req.flash('data', req.body)
            return res.redirect(`/pustakawan/penerbit-koran/edit/${id}`)
        }

        await modelPenerbitKoran.update(data, id)
        req.flash('success', 'Data berhasil diedit')
        res.redirect('/pustakawan/penerbit-koran')
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/pustakawan/penerbit-koran')
    }
})

router.post('/hapus/:id', authPustakawan, async (req, res) => {
    try {
        const {id} = req.params

        if (await modelPenerbitKoran.checkPenerbitKoranUsed(id)) {
            req.flash("error", "Penerbit Koran masih digunakan pada koran")
            return res.redirect(`/pustakawan/penerbit-koran`)
        }

        await modelPenerbitKoran.delete(id)
        req.flash('success', 'Data berhasil dihapus')
        res.redirect('/pustakawan/penerbit-koran')
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/pustakawan/penerbit-koran')
    }
})
module.exports = router