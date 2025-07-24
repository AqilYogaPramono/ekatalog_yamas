//midleware to check level_pengurus
const modelPengurus = require('../model/modelPengurus')

const authPengurus = async (req, res, next) => {
    try {
        const checkLevel = await modelPengurus.getPengurusById(req.session.pengurusId)
        if(checkLevel.level_pengurus == "Pengurus") return next()
    } catch(err) {
        req.flash('error', 'Terjadi kesalahan saat login')
        res.redirect('/login')
    }
}

const authAdmin = async (req, res, next) => {
    try {
        const checkLevel = await modelPengurus.getPengurusById(req.session.pengurusId)
        if(checkLevel.level_pengurus == "Admin") return next()
    } catch(err) {
        req.flash('error', 'Terjadi kelasalahan saat login')
        res.redirect('/login')
    }
}

module.exports = {authPengurus, authAdmin}