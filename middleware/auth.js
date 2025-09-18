//midleware to check peran
const modelPengurus = require('../model/modelPengurus')

const authPengurus = async (req, res, next) => {
    try {
        const pengurusId = req.session.pengurusId
        const checkLevel = await modelPengurus.getPengurusById(pengurusId)
        if(checkLevel.peran == "Pengurus") return next()
    } catch(err) {
        req.flash('error', 'Terjadi kesalahan saat login')
        res.redirect('/login')
    }
}

const authAdmin = async (req, res, next) => {
    try {
        const pengurusId = req.session.pengurusId
        const checkLevel = await modelPengurus.getPengurusById(pengurusId)
        if(checkLevel.peran == "Admin") return next()
    } catch(err) {
        req.flash('error', 'Terjadi kelasalahan saat login')
        res.redirect('/login')
    }
}

module.exports = {authPengurus, authAdmin}