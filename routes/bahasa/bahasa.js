var express = require('express')
var router = express.Router()
const modelBahasa = require('../../model/modelBahasa')

router.get('/', async(req, res) => {
    try {
        // let data = await modelBahasa.getAll()
    res.render('pengurus/user/bahasa/index')
    } catch(err) {
        req.flash('error', err.message);
    }
})

// router.post('/buat', async(req, res) => {
//     try {
//         let {bahasa} = req.body
//         let data = {bahasa}
//         await modelBahasa.store(data)
//         res.redirect('pengurus/user/bahasa/index')
//     } catch {
//         req.flash(err)
//     }
// })

// router.post('udpate/:id', async (req, res) => {
//     try {
//         let id = req.params
//         let {bahasa} = req.body
//         let data = {bahasa}
//         await modelBahasa.update(data, id)
//         res.render('/pengurus/user/bahasa/bahasa')
//     } catch {
//         req.flash(err)
//     }
// })

// router.post('/delete/:id', async (req, res) => {
//     try {
//         let id = req.params
//         await modelBahasa.delete(id)
//         res.redirect('/pengurus/user/bahasa/bahasa')
//     } catch {
//         req.flash(err)
//     }
// })

module.exports = router
