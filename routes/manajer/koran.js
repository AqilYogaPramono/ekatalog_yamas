const express = require('express')
const router = express.Router()
// import model koran
const modelKoran = require('../../model/modelKoran')
// import model penerbit koran
const modelPenerbitKoran = require('../../model/modelPenerbitKoran')
// import model pengguna
const modelPengguna = require('../../model/modelPengguna')
// import middleware untuk mengecek peran pengguna login
const {authManajer} = require('../../middleware/auth')


router.get('/', authManajer, async (req, res) => {
    try {
        const userId = req.session.penggunaId
        const user = await modelPengguna.getNamaPenggunaById(userId)

        const flashedIdPenerbit = req.flash('id_penerbit_koran')[0]
        const flashedTahun = req.flash('tahun')[0]
        const flashedBulan = req.flash('bulan')[0]
        const page = parseInt(req.query.page) || 1
        const limit = 20
        const offset = (page - 1) * limit

        const penerbitList = await modelPenerbitKoran.getAll()

        if (flashedIdPenerbit && flashedTahun && flashedBulan) {
            const filters = { id_penerbit_koran: flashedIdPenerbit, tahun: flashedTahun, bulan: flashedBulan }
            const koran = await modelKoran.searchKoranHapus(filters)
            const totalHalaman = 1
            return res.render('pengurus/manajer/koran/index', { koran, user, page: 1, totalHalaman, filters, penerbitList })
        }

        const koran = await modelKoran.getKoranHapus(limit, offset)
        const totalKoran = koran.length
        const totalHalaman = Math.ceil(totalKoran / limit)

        res.render('pengurus/manajer/koran/index', { koran, user, page, totalHalaman, penerbitList, filters: { id_penerbit_koran: '', tahun: '', bulan: '' } })
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/manajer/dashboard')
    }
})

router.post('/search', authManajer, async (req, res) => {
    try {
        const { id_penerbit_koran, tahun, bulan } = req.body
        req.flash('id_penerbit_koran', id_penerbit_koran)
        req.flash('tahun', tahun)
        req.flash('bulan', bulan)
        return res.redirect('/manajer/koran')
    } catch (err) {
        console.error(err)
        req.flash('error', err.message)
        return res.redirect('/manajer/dashboard')
    }
})

router.get('/:id', authManajer, async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.session.penggunaId
        const user = await modelPengguna.getNamaPenggunaById(userId)
        const koran = await modelKoran.getByIdHapus(id)
        res.render(`pengurus/manajer/koran/detail`, { koran, user })
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/manajer/koran')
    }
})

router.post('/edit/:id', authManajer, async (req, res) => {
    try {
        const { id } = req.params
        const { status_data } = req.body
        const data = { status_data }
        await modelKoran.updateStatusData(data, id)
        req.flash('success', 'Koran berhasil ditampilkan')
        res.redirect('/manajer/koran')
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/manajer/koran')
    }
})

router.post('/delete/:id', authManajer, async (req, res) => {
    try {
        const { id } = req.params

        await modelKoran.hardDelete(id)
        req.flash('success', 'Koran berhasil dihapus')
        res.redirect('/manajer/koran')
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/manajer/koran')
    }
})

module.exports = router