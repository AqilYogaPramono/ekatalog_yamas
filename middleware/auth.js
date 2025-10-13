// import model pengguna
const modelPengguna = require('../model/modelPengguna')

// mengecek peran berdasakan id pengguna
const authPustakawan = async (req, res, next) => {
    try {
        const penggunaId = req.session.penggunaId
        const checkLevel = await modelPengguna.getPenggunaById(penggunaId)
        if(checkLevel.peran == "Pustakawan") return next()
    } catch(err) {
        console.log(err)
        req.flash('error', 'Anda tidak memiliki akses ke halaman ini')
        res.redirect('/login')
    }
}

const authManajer = async (req, res, next) => {
    try {
        const penggunaId = req.session.penggunaId
        const checkLevel = await modelPengguna.getPenggunaById(penggunaId)
        if(checkLevel.peran == "Manajer") return next()
    } catch(err) {
        console.log(err)
        req.flash('error', 'Anda tidak memiliki akses ke halaman ini')
        res.redirect('/login')
    }
}

module.exports = {authPustakawan, authManajer}