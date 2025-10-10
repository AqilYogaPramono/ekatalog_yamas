const express = require('express')
const router = express.Router()
const path = require('path')
const multer = require('multer')
const fs = require('fs')
const xlsx = require('xlsx')
// Import model buku
const modelBuku = require('../../../model/modelBuku')
const modelRak = require('../../../model/modelRak')
const modelPengguna = require('../../../model/modelPengguna')
const {authPustakawan} = require('../.././../middleware/auth')
const { convertImageFile } = require('../../../middleware/convertImage')

//konfigurasi multer untuk upload gambar
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../../public/images/buku'))
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
        const filePath = path.join(__dirname, '../../../public/images/buku', file.filename)
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
        }
    }
}

// Fungsi untuk menghapus foto lama saat update
const deleteOldPhoto = (oldPhoto) => {
    if (oldPhoto) {
        const filePath = path.join(__dirname, '../../../public/images/buku', oldPhoto)
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
    }
}

router.get('/', authPustakawan, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = 20
        const offset = (page - 1) * limit

        const buku = await modelBuku.getBuku(limit, offset)
        const totalBuku = buku.length

        const totalHalaman = Math.ceil(totalBuku / limit)

        const userId = req.session.penggunaId

        const  user = await modelPengguna.getPenggunaById(userId)

        res.render('pengurus/pustakawan/buku/index', {buku, user, page, totalHalaman})
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/pustakawan/dashboard')
    }
})

router.post('/search', authPustakawan, async (req, res) => {
    try {
        const {judul} = req.body
        const buku = await modelBuku.searchJudulBuku(judul)

        res.render('pengurus/pustakawan/buku/index', {buku})
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/pustakawan/dashboard')
    }
})

router.get('/buat', authPustakawan, async (req, res) => {
    try {
        const userId = req.session.penggunaId

        const user = await modelPengguna.getPenggunaById(userId)
        const rak = await modelRak.getAll()

        res.render('pengurus/pustakawan/buku/buat', { 
            rak, 
            user,
            data: req.flash('data')[0]
        })
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/pustakawan/buku')
    }
})

router.get('/:id', authPustakawan, async (req, res) => {
    try {
        const userId = req.session.penggunaId
        const {id} = req.params

        const user = await modelPengguna.getPenggunaById(userId)

        const buku = await modelBuku.getById(id)
        
        res.render('pengurus/pustakawan/buku/detail', {buku, user})
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/pustakawan/buku')
    }
})

router.post('/create', authPustakawan, upload.single('foto_cover'), async (req, res) => {
    try {

        const {judul, isbn_issn, no_klasifikasi, bahasa, jumlah_halaman, tahun_terbit, sinopsis, tempat_terbit, penerbit, kategori, pengarang, id_rak} = req.body

        const foto_cover = req.file ? req.file.filename : null

        const userId = req.session.penggunaId

        const user = await modelPengguna.getPenggunaById(userId)

        const data = {judul, foto_cover, isbn_issn, no_klasifikasi, bahasa, jumlah_halaman, tahun_terbit, sinopsis, tempat_terbit, penerbit, kategori, pengarang, id_rak, dibuat_oleh: user.nama}

        // cek judul
        if (!data.judul) {
            deleteUploadedFile(req.file)

            req.flash('error', 'Judul tidak boleh kosong')
            req.flash('data', req.body)
            return res.redirect('/pustakawan/buku/buat')
        }

        // cek isbn_issn
        if (!data.isbn_issn) {
            deleteUploadedFile(req.file)

            req.flash('error', 'ISBN/ISSN tidak boleh kosong')
            req.flash('data', req.body)
            return res.redirect('/pustakawan/buku/buat')
        }

        // cek foto_cover
        if (!data.foto_cover) {
            deleteUploadedFile(req.file)

            req.flash('error', 'Foto cover tidak boleh kosong')
            req.flash('data', req.body)
            return res.redirect('/pustakawan/buku/buat')
        }

        // cek lokasi
        if (!data.id_rak) {
            deleteUploadedFile(req.file)

            req.flash('error', 'Rak tidak boleh kosong')
            req.flash('data', req.body)
            return res.redirect('/pustakawan/buku/buat')
        }

        // cek no_klasifikasi
        if (!data.no_klasifikasi) {
            deleteUploadedFile(req.file)

            req.flash('error', 'No Klasifikasi tidak boleh kosong')
            req.flash('data', req.body)
            return res.redirect('/pustakawan/buku/buat')
        }

        //cek no_klasifikasi duplikat
        const cekNoKlasifikasi = await modelBuku.checkNoKlasifikasiCreate(data)
        if (cekNoKlasifikasi) {
            deleteUploadedFile(req.file)

            req.flash('error', 'No Klasifikasi sudah ada')
            req.flash('data', req.body)
            return res.redirect('/pustakawan/buku/buat')
        }

        //cek isbn/issn duplikat
        const cekIsbnIssn = await modelBuku.checkIsbnIssnCreate(data)
        if (cekIsbnIssn) {
            deleteUploadedFile(req.file)

            req.flash('error', 'ISBN/ISSN sudah ada')
            req.flash('data', req.body)
            return res.redirect('/pustakawan/buku/buat')
        }

        const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
        if (req.file && !allowedFormats.includes(req.file.mimetype)) {
            req.flash('error', 'Hanya file gambar (jpg, jpeg, png, webp) yang diizinkan')
            req.flash('data', req.body)
            return res.redirect('/pustakawan/buku/buat')
        }

        //convert image to webp and compress when < 500kb
        if (req.file && req.file.path) {
            const result = await convertImageFile(req.file.path)
            if (result && result.outputPath) {
                data.foto_cover = path.basename(result.outputPath)
            }
        }

        await modelBuku.store(data)

        req.flash('success', 'Buku berhasil ditambahkan')
        res.redirect('/pustakawan/buku')
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/pustakawan/buku')
    }
})

router.post('/create-batch-buku', authPustakawan, uploadBatch.array('files'), async (req, res) => {
    try {
        const files = req.files || []

        const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel' ]

        for (const file of req.files) {
            if (!allowedFormats.includes(file.mimetype)) {
                deleteUploadedFile(req.files)
                req.flash('error', `Tipe file "${file.originalname}" tidak diizinkan. Hanya gambar (jpg, jpeg, png, webp) dan Excel (.xlsx) yang boleh.`)
                return res.redirect('/pustakawan/buku')
            }
        }

        const excelFile = files.find(f => f.originalname.endsWith('.xlsx') || f.originalname.endsWith('.xls'))
        const imageFiles = files.filter(f => f.mimetype.startsWith('image'))

        if (!excelFile) {
            req.flash('error', 'File Excel tidak ditemukan.')
            deleteUploadedFile(files)
            return res.redirect('/pustakawan/buku')
        }

        const userId = req.session.penggunaId

        const  user = await modelPengguna.getPenggunaById(userId)

        const imgMap = {}
        const filenameToFile = {}
        for (const file of imageFiles) {
            const originalRelPath = file.originalname.replace(/\\/g, '/')
            imgMap[originalRelPath] = file.filename
            imgMap[path.basename(originalRelPath)] = file.filename
            filenameToFile[file.filename] = file
        }

        const workbook = xlsx.readFile(excelFile.path)
        const sheet = workbook.Sheets[workbook.SheetNames[0]]
        const rows = xlsx.utils.sheet_to_json(sheet)
        
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
                isbn_issn: row.isbn_issn,
                no_klasifikasi: row.no_klasifikasi,
                bahasa: row.bahasa,
                jumlah_halaman: row.jumlah_halaman,
                tahun_terbit: row.tahun_terbit,
                sinopsis: row.sinopsis,
                tempat_terbit: row.tempat_terbit,
                penerbit: row.penerbit,
                kategori: row.kategori,
                pengarang: row.pengarang,
                id_rak: getIdRak(row.kode_rak),
                foto_cover: filename,
                dibuat_oleh: user.nama
            }

            if (!filename) {
                req.flash('error', `Foto cover "${row.foto_cover}" tidak ditemukan pada baris ke-${barisKe}`)
                deleteUploadedFile(files)
                return res.redirect('/pustakawan/buku')
            }

            if (!data.id_rak) {
                req.flash('error', `Rak dengan kode "${row.kode_rak}" tidak ditemukan pada baris ke-${barisKe}`)
                deleteUploadedFile(files)
                return res.redirect('/pustakawan/buku')
            }

            const checkNoKlasifikasi = await modelBuku.checkNoKlasifikasiCreate(data)
            if (checkNoKlasifikasi) {
                req.flash('error', `No klasifikasi "${data.no_klasifikasi}" sudah digunakan, pada baris ke-${barisKe}`)
                deleteUploadedFile(files)
                return res.redirect('/pustakawan/buku')
            }

            const checkIsbnIssn = await modelBuku.checkIsbnIssnCreate(data)
            if (checkIsbnIssn) {
                req.flash('error', `ISBN/ISSN "${data.isbn_issn}" sudah digunakan, pada baris ke-${barisKe}`)
                deleteUploadedFile(files)
                return res.redirect('/pustakawan/buku')
            }

            if (!data.judul || !data.isbn_issn || !data.no_klasifikasi || !data.id_rak || !data.foto_cover) {
                req.flash('error', `Data tidak lengkap pada baris ke-${barisKe}`)
                deleteUploadedFile(files)
                return res.redirect('/pustakawan/buku')
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

        req.flash('success', 'Data Buku berhasil diunggah.')
        res.redirect('/pustakawan/buku')

    } catch (err) {
        console.log(err)
        if (req.files) {
            for (const file of req.files) {
                fs.unlinkSync(file.path)
            }
        }
        req.flash('error', 'Gagal mengunggah data Buku')
        res.redirect('/pustakawan/buku')
    }
})

router.get('/edit/:id', authPustakawan, async (req, res) => {
    try {
        const {id} = req.params
        const rak = await modelRak.getAll()
        const buku = await modelBuku.getById(id)
        const userId = req.session.penggunaId

        const  user = await modelPengguna.getPenggunaById(userId)

        res.render('pengurus/pustakawan/buku/edit', { rak, buku, user })
    } catch(err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/pustakawan/buku')
    }
})

router.post('/update/:id', authPustakawan, upload.single('foto_cover'), async (req, res) => {
    try {
        const {id} = req.params

        const userId = req.session.penggunaId

        const  user = await modelPengguna.getPenggunaById(userId)

        const buku = await modelBuku.getById(id)

        const {judul, isbn_issn, no_klasifikasi, bahasa, jumlah_halaman, tahun_terbit, sinopsis, tempat_terbit, penerbit, kategori, pengarang, id_rak, ketersediaan} = req.body

        const foto_cover = req.file ? req.file.filename : buku.foto_cover

        const data = {judul, foto_cover, isbn_issn, no_klasifikasi, bahasa, jumlah_halaman, tahun_terbit, sinopsis, tempat_terbit, penerbit, kategori, pengarang, id_rak, ketersediaan, diubah_oleh: user.nama}

        // cek judul
        if (!data.judul) {
            deleteUploadedFile(req.file)
            
            req.flash('error', 'Judul tidak boleh kosong')
            return res.redirect(`/pustakawan/buku/edit/${id}`)
        }

        // cek isbn_issn
        if (!data.isbn_issn) {
            deleteUploadedFile(req.file)

            req.flash('error', 'ISBN/ISSN tidak boleh kosong')
            return res.redirect(`/pustakawan/buku/edit/${id}`)
        }

        // cek no_klasifikasi
        if (!data.no_klasifikasi) {
            deleteUploadedFile(req.file)

            req.flash('error', 'No Klasifikasi tidak boleh kosong')
            return res.redirect(`/pustakawan/buku/edit/${id}`)
        }

        // cek lokasi
        if (!data.id_rak) {
            deleteUploadedFile(req.file)

            req.flash('error', 'Rak tidak boleh kosong')
            return res.redirect(`/pustakawan/buku/edit/${id}`)
        }

        // cek foto_cover
        if (!data.foto_cover) {
            deleteUploadedFile(req.file)

            req.flash('error', 'Foto Cover tidak boleh kosong')
            return res.redirect(`/pustakawan/buku/edit/${id}`)
        }

        //cek no_klasifikasi duplikat
        if (await modelBuku.checkNoKlasifikasiEdit(data, id)) {
            deleteUploadedFile(req.file)

            req.flash('error', 'No Klasifikasi sudah ada')
            return res.redirect(`/pustakawan/buku/edit/${id}`)
        }

        //cek isbn/issn duplikat
        if (await modelBuku.checkIsbnIssnEdit(data, id)) {
            deleteUploadedFile(req.file)

            req.flash('error', 'ISBN/ISSN sudah ada')
            return res.redirect(`/pustakawan/buku/edit/${id}`)
        }

        const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
        if (req.file && !allowedFormats.includes(req.file.mimetype)) {
            deleteUploadedFile(req.file)

            req.flash('error', 'Hanya file gambar (jpg, jpeg, png, webp) yang diizinkan')
            req.flash('data', req.body)
            return res.redirect(`/pustakawan/buku/edit/${id}`)
        }

        // convert image to webp and compress when < 500kb
        if (req.file && req.file.path) {
            const result = await convertImageFile(req.file.path)
            if (result && result.outputPath) {
                data.foto_cover = path.basename(result.outputPath)
            }
        }

        if (req.file) deleteOldPhoto(buku.foto_cover)

        await modelBuku.update(id, data)

        req.flash('success', 'Buku berhasil diperbarui')
        res.redirect('/pustakawan/buku')
    } catch (err) {
        console.log(err)
        deleteUploadedFile(req.file)
        req.flash('error', err.message)
        res.redirect(`/pustakawan/buku`)
    }
})

router.post('/delete/:id', authPustakawan, async (req, res) => {
    try {
        const {id} = req.params
        const userId = req.session.penggunaId

        const  user = await modelPengguna.getPenggunaById(userId)

        await modelBuku.softDelete(user, id)
        
        req.flash('success', 'Buku berhasil dihapus')
        res.redirect('/pustakawan/buku')
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/pustakawan/buku')
    }
})

module.exports = router