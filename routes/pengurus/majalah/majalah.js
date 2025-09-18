const express = require('express')
const router = express.Router()
const path = require('path')
const multer = require('multer')
const fs = require('fs')
const xlsx = require('xlsx')
const modelMajalah = require('../../../model/modelMajalah')
const modelRak = require('../../../model/modelRak')
const modelPengurus = require('../../../model/modelPengurus')
const {authPengurus} = require('../.././../middleware/auth')
const { convertImageFile } = require('../../../middleware/convertImage')

//konfigurasi multer untuk upload gambar
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../../public/images/majalah'))
    },
    filename: (req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random()*1e9)
        cb(null, unique + path.extname(file.originalname))
    }
})

//instalisasi multer dengan konfigurasi storage dan filter ukuran file
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowed = /jpeg|jpg|png/
        const ok = allowed.test(file.mimetype) && allowed.test(path.extname(file.originalname).toLowerCase())
        cb(ok ? null : new Error('Only image files (jpeg, jpg, png) are allowed'), ok)
    }
})

const uploadBatch = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedImage = /jpeg|jpg|png/
        const isImage = allowedImage.test(file.mimetype) && allowedImage.test(path.extname(file.originalname).toLowerCase())
        const isExcel = file.mimetype == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

        if (isImage || isExcel) {
        cb(null, true)
        } else {
        cb(new Error('File harus berupa gambar (jpg/png) atau Excel (.xlsx)'), false)
        }
    }
})

// Fungsi untuk menghapus file yang diupload
const deleteUploadedFile = (input) => {
    if (!input) return

    const files = Array.isArray(input) ? input : [input]

    for (const file of files) {
        if (!file || !file.filename) continue
        const filePath = path.join(__dirname, '../../../public/images/majalah', file.filename)
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
        }
    }
}

// Fungsi untuk menghapus foto lama saat update
const deleteOldPhoto = (oldPhoto) => {
    if (oldPhoto) {
        const filePath = path.join(__dirname, '../../../public/images/majalah', oldPhoto)
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
    }
}

// Get all majalah
router.get('/', authPengurus, async (req, res) => {
    try {
        const data = await modelMajalah.getAll()
        const userId = req.session.pengurusId

        const  user = await modelPengurus.getPengurusById(userId)
        res.render('pengurus/user/majalah/index', { data, user })
    } catch (err) {
        req.flash('error', err.message)
        res.redirect('/pengurus/dashboard')
    }
})

//
router.get('/buat', authPengurus, async (req, res) => {
    try {
        const rak = await modelRak.getAll()
        const userId = req.session.pengurusId

        const  user = await modelPengurus.getPengurusById(userId)
        res.render('pengurus/user/majalah/buat', { rak, data: {}, user})
    } catch (err) {
        req.flash('error', err.message)
        res.redirect('/pengurus/dashboard')
    }
})

// Create new majalah
router.post('/create', authPengurus, upload.single('foto_cover'), async (req, res) => {
    try {
        const {judul, edisi, no_klasifikasi, bahasa, tahun_terbit, sinopsis, tempat_terbit, penerbit, id_rak } = req.body

        const foto_cover = req.file ? req.file.filename : existing_foto_cover || null
        
        const userId = req.session.pengurusId

        const user = await modelPengurus.getPengurusById(userId)

        const data = { judul, foto_cover, edisi, no_klasifikasi, bahasa, tahun_terbit, sinopsis, tempat_terbit, penerbit, id_rak, dibuat_oleh: user.nama }

        //cek data yang tidak lengkap
        if (!data.judul || !data.edisi || !data.no_klasifikasi || !data.id_rak || !data.foto_cover) {
            deleteUploadedFile(req.file)

            const rak = await modelRak.getAll()
            req.flash('error', 'Data tidak lengkap')
            return res.render('pengurus/user/majalah/buat', {rak, data})
        }

        //cek no_klasifikasi
        const cekNoKlasifikasi = await modelMajalah.checkNoKlasifikasiCreate(data)
        if (cekNoKlasifikasi) {
            deleteUploadedFile(req.file)

            const rak = await modelRak.getAll()
            console.log(data)
            req.flash('error', 'No Klasifikasi sudah ada')
            return res.render('pengurus/user/majalah/buat', {rak, data})
        }

        if (req.file && req.file.path) {
            const result = await convertImageFile(req.file.path)
            if (result && result.outputPath) {
                data.foto_cover = path.basename(result.outputPath)
            }
        }

        await modelMajalah.store(data)

        req.flash('success', 'Majalah berhasil ditambahkan')
        res.redirect('/pengurus/majalah')
    } catch (err) {
        deleteUploadedFile(req.file)
        const rak = await modelRak.getAll()
        req.flash('error', err.message)
        res.redirect('/pengrus/majalah')
    }
})


router.post('/create-batch-majalah', authPengurus, uploadBatch.array('files'), async (req, res) => {
    try {
        const files = req.files || []

        const excelFile = files.find(f => f.originalname.endsWith('.xlsx') || f.originalname.endsWith('.xls'))
        const imageFiles = files.filter(f => f.mimetype.startsWith('image'))

        if (!excelFile) {
            req.flash('error', 'File Excel tidak ditemukan.')
            deleteUploadedFile(files)
            return res.redirect('/pengurus/majalah')
        }

        const imgMap = {}
        for (const file of imageFiles) {
            const originalRelPath = file.originalname.replace(/\\/g, '/')
            imgMap[originalRelPath] = file.filename
            imgMap[path.basename(originalRelPath)] = file.filename
        }

        const workbook = xlsx.readFile(excelFile.path)
        const sheet = workbook.Sheets[workbook.SheetNames[0]]
        const rows = xlsx.utils.sheet_to_json(sheet)

        const userId = req.session.pengurusId

        const  user = await modelPengurus.getPengurusById(userId)

        const rak = await modelRak.getAll()

        const getIdRak = (kode_rak) => {
            if (!kode_rak) return null
            const found = rak.find(r => (r.kode_rak || '').toLowerCase() == String(kode_rak).toLowerCase())
            return found ? found.id : null
        }

        const validDataList = []

        for (const [index, row] of rows.entries()) {
            const barisKe = index + 2

            const fotoName = path.basename(row.foto_cover || '')
            const filename = imgMap[fotoName] || null

            const data = {
                judul: row.judul,
                edisi: row.edisi,
                no_klasifikasi: row.no_klasifikasi,
                bahasa: row.bahasa,
                tahun_terbit: row.tahun_terbit,
                sinopsis: row.sinopsis,
                tempat_terbit: row.tempat_terbit,
                penerbit: row.penerbit,
                id_rak: getIdRak(row.kode_rak),
                foto_cover: filename,
                dibuat_oleh: user.nama
            }

            if (!filename) {
                req.flash('error', `Foto cover "${row.foto_cover}" tidak ditemukan pada baris ke-${barisKe}`)
                deleteUploadedFile(files)
                return res.redirect('/pengurus/majalah')
            }

            const uploadedImage = imageFiles.find(f => f.filename === filename)
            if (uploadedImage && uploadedImage.size > 2 * 1024 * 1024) {
                req.flash('error', `Ukuran foto cover "${row.foto_cover}" pada baris ke-${barisKe} melebihi 2MB`)
                deleteUploadedFile(files)
                return res.redirect('/pengurus/majalah')
            }

            if (!data.id_rak) {
                req.flash('error', `Rak dengan kode "${row.kode_rak}" tidak ditemukan pada baris ke-${barisKe}`)
                deleteUploadedFile(files)
                return res.redirect('/pengurus/majalah')
            }

            const checkNoKlasifikasi = await modelMajalah.checkNoKlasifikasiCreate({ no_klasifikasi: data.no_klasifikasi })
            if (checkNoKlasifikasi) {
                req.flash('error', `No klasifikasi "${data.no_klasifikasi}" sudah digunakan pada baris ke-${barisKe}`)
                deleteUploadedFile(files)
                return res.redirect('/pengurus/majalah')
            }

            if (!data.judul || !data.edisi || !data.no_klasifikasi || !data.id_rak || !data.foto_cover) {
                req.flash('error', `Data tidak lengkap pada baris ke-${barisKe}`)
                deleteUploadedFile(files)
                return res.redirect('/pengurus/majalah')
            }

            validDataList.push({ data, filename })
        }

        const digunakanFotoNames = new Set()

        for (const item of validDataList) {
            const srcFile = filenameToFile[item.filename]
            if (srcFile && srcFile.path) {
                try {
                    const result = await convertImageFile(srcFile.path)
                    if (result && result.outputPath) {
                        item.data.foto_cover = path.basename(result.outputPath)
                        digunakanFotoNames.add(path.basename(result.outputPath))
                    } else {
                        digunakanFotoNames.add(item.filename)
                    }
                } catch (e) {
                    digunakanFotoNames.add(item.filename)
                }
            } else {
                digunakanFotoNames.add(item.filename)
            }

            await modelBuku.store(item.data)
        }

        for (const file of imageFiles) {
            if (!digunakanFotoNames.has(file.filename)) {
                deleteOldPhoto(file.filename)
            }
        }

        fs.unlinkSync(excelFile.path)

        req.flash('success', 'Data Majalah berhasil diunggah.')
        res.redirect('/pengurus/majalah')

    } catch (err) {
        console.error(err)
        if (req.files) {
            for (const file of req.files) {
                fs.unlinkSync(file.path)
            }
        }

        req.flash('error', 'Gagal mengunggah data majalah')
        res.redirect('/pengurus/majalah')
    }
})

router.get('/edit/:id', authPengurus, async (req, res) => {
    try {
        const {id} = req.params

        const rak = await modelRak.getAll()
        const majalah = await modelMajalah.getById(id)
        const userId = req.session.pengurusId

        const  user = await modelPengurus.getPengurusById(userId)

        res.render('pengurus/user/majalah/edit', { majalah, rak, user })
    } catch (err) {
        req.flash('error', err.message)
        res.redirect(`/pengurus/majalah/edit/${id}`)
    }
})

// Update majalah
router.post('/update/:id', authPengurus, upload.single('foto_cover'), async (req, res) => {
    try {
        const { id } = req.params

        const majalah = await modelMajalah.getById(id)

        const userId = req.session.pengurusId

        const  user = await modelPengurus.getPengurusById(userId)

        const {judul, edisi, no_klasifikasi, bahasa, tahun_terbit, sinopsis, tempat_terbit, penerbit, id_rak, ketersediaan} = req.body

        const foto_cover = req.file ? req.file.filename : majalah.foto_cover

        const data = {judul, foto_cover, edisi, no_klasifikasi, bahasa, tahun_terbit, sinopsis, tempat_terbit, penerbit, id_rak, ketersediaan, diubah_oleh: user.nama}

        //cek data yang tidak lengkap
        if (!data.judul || !data.edisi || !data.no_klasifikasi || !data.id_rak || !data.foto_cover) {
            deleteUploadedFile(req.file)

            const rak = await modelRak.getAll()
            req.flash('error', 'Data tidak lengkap')
            return res.redirect(`/pengurus/majalah/edit/${id}`, { user })
        }

        //cek no_klasifikasi
        const cekNoKlasifikasi = await modelMajalah.checkNoKlasifikasiEdit(data, id)
        if (cekNoKlasifikasi) {
            deleteUploadedFile(req.file)

            const rak = await modelRak.getAll()
            req.flash('error', 'No Klasifikasi sudah ada')
            return res.redirect(`/pengurus/majalah/edit/${id}`, { user })
        }

        if (req.file && req.file.path) {
            const result = await convertImageFile(req.file.path)
            if (result && result.outputPath) {
                data.foto_cover = path.basename(result.outputPath)
            }
        }

        if (req.file) deleteOldPhoto(majalah.foto_cover)

        await modelMajalah.update(id, data)

        req.flash('success', 'Majalah berhasil diupdate')
        res.redirect(`/pengurus/majalah`)
    } catch (err) {
        deleteUploadedFile(req.file)
        req.flash('error', err.message)
        res.redirect(`/pengurus/majalah`)
    }
})

// Delete majalah
router.post('/delete/:id', authPengurus, async (req, res) => {
    try {
        const { id } = req.params
        
        const userId = req.session.pengurusId

        const  user = await modelPengurus.getPengurusById(userId)

        await modelMajalah.softDelete(user, id)

        req.flash('success', 'Majalah berhasil dihapus')
        res.redirect('/pengurus/majalah')
    } catch (err) {
        req.flash('error', err.message)
        res.redirect('/pengurus/majalah')
    }
})

module.exports = router