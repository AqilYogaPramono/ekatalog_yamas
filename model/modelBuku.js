const connection = require('../config/database')

class modelBuku {
    static async getBukuAndMajalah(keyword) {
        try {const [rows] = await connection.query(`SELECT m.id AS id, m.foto_cover AS 'foto-cover', CONCAT(m.judul, ' - ', m.edisi) AS 'judul - edisi', m.judul AS judul, m.no_klasifikasi, CONCAT(r.kode_rak, ' - ', ru.kode_ruangan, ' - ', l.kode_lantai) AS lokasi, 'Majalah' AS tipe FROM majalah m LEFT JOIN rak r ON m.id_rak = r.id LEFT JOIN ruangan ru ON r.id_ruangan = ru.id LEFT JOIN lantai l ON ru.id_lantai = l.id WHERE m.status_data = 'Tampil' AND (m.judul LIKE CONCAT('%', ?, '%') OR m.edisi LIKE CONCAT('%', ?, '%')) UNION SELECT b.id AS id, b.foto_cover AS 'foto-cover', NULL AS 'judul - edisi', b.judul AS judul, b.no_klasifikasi, CONCAT(r.kode_rak, ' - ', ru.kode_ruangan, ' - ', l.kode_lantai) AS lokasi, 'Buku' AS tipe FROM buku b LEFT JOIN rak r ON b.id_rak = r.id LEFT JOIN ruangan ru ON r.id_ruangan = ru.id LEFT JOIN lantai l ON ru.id_lantai = l.id WHERE b.status_data = 'Tampil' AND b.judul LIKE CONCAT('%', ?, '%')`,[keyword, keyword, keyword])
            return rows
        } catch (err) {
            throw err
        }
    }

    static async getDetailBuku(id) {
        try {const [rows] = await connection.query(`SELECT b.judul, b.foto_cover, b.isbn_issn, b.no_klasifikasi, b.bahasa, b.jumlah_halaman, b.tahun_terbit, b.sinopsis, b.tempat_terbit, b.penerbit, b.kategori, b.pengarang, CONCAT(r.kode_rak, ' - ', ru.kode_ruangan, ' - ', l.kode_lantai) AS lokasi FROM buku b LEFT JOIN rak r ON b.id_rak = r.id LEFT JOIN ruangan ru ON r.id_ruangan = ru.id LEFT JOIN lantai l ON ru.id_lantai = l.id WHERE b.id = ? AND b.status_data = 'Tampil'`, [id])
            return rows
        } catch (err) {
            throw err
        }
    }

    static async getBuku(limit, offset) {
        try {
            const [rows] = await connection.query(`SELECT b.id, b.judul, b.foto_cover, b.isbn_issn, b.no_klasifikasi, CONCAT(r.kode_rak, ' - ', ru.kode_ruangan, ' - ', l.kode_lantai) AS lokasi_buku FROM buku b LEFT JOIN rak r ON b.id_rak = r.id LEFT JOIN ruangan ru ON r.id_ruangan = ru.id LEFT JOIN lantai l ON ru.id_lantai = l.id WHERE b.status_data = 'Tampil' ORDER BY b.dibuat_pada DESC LIMIT ? OFFSET ?`, [limit, offset])
            return rows
        } catch (err) {
            throw err
        }
    }

    static async store(data) {
        try {
            const [result] = await connection.query(`INSERT INTO buku SET ?`, [data])
            return result
        } catch (err) {
            throw err
        }
    }

    static async update(id, data) {
        try {
            const [result] = await connection.query(`UPDATE buku SET ? WHERE id = ?`, [data, id])
            return result
        } catch (err) {
            throw err
        }
    }

    static async hardDelete(id) {
        try {
            const [result] = await connection.query(`DELETE FROM buku WHERE id = ?`, [id])
            return result
        } catch (err) {
            throw err
        }
    }

    static async softDelete(user, id) {
        try {
            const [result] = await connection.query(`UPDATE buku SET status_data = 'Hapus', dihapus_pada = now(), dihapus_oleh = ? WHERE id = ?`,[user.nama, id])
            return result
        } catch (err) {
            throw err
        }
    }

    static async getById(id) {
        try {
            const [rows] = await connection.query(`SELECT b.id, b.judul, b.foto_cover, b.isbn_issn, b.no_klasifikasi, b.bahasa, b.jumlah_halaman, b.tahun_terbit, b.sinopsis, b.tempat_terbit, b.penerbit, b.kategori, b.pengarang, r.kode_rak, ru.kode_ruangan, l.kode_lantai , b.ketersediaan, b.dibuat_pada, b.diubah_pada, b.dibuat_oleh, b.diubah_oleh, b.status_data FROM buku b LEFT JOIN rak r ON b.id_rak = r.id LEFT JOIN ruangan ru ON r.id_ruangan = ru.id LEFT JOIN lantai l ON ru.id_lantai = l.id WHERE b.status_data = 'Tampil' AND b.id = ?`,[id])
            return rows[0]
        } catch (err) {
            throw err
        }
    }

    static async checkNoKlasifikasiCreate(data) {
        try {
            const [rows] = await connection.query(`SELECT * FROM buku WHERE no_klasifikasi = ?`, [data.no_klasifikasi])
            return rows.length > 0
        } catch (err) {
            throw err
        }
    }

    static async checkIsbnIssnCreate(data) {
        try {
            const [rows] = await connection.query(`SELECT * FROM buku WHERE isbn_issn = ?`, [data.isbn_issn])
            return rows.length > 0
        } catch (err) {
            throw err
        }
    }

    static async checkNoKlasifikasiEdit(data, id) {
        try {
            const [rows] = await connection.query(`SELECT * FROM buku WHERE no_klasifikasi = ? AND id != ?`, [data.no_klasifikasi, id])
            return rows.length > 0
        } catch (err) {
            throw err
        }
    }

    static async checkIsbnIssnEdit(data, id) {
        try {
            const [rows] = await connection.query(`SELECT * FROM buku WHERE isbn_issn = ? AND id != ?`, [data.isbn_issn, id])
            return rows.length > 0
        } catch (err) {
            throw err
        }
    }

    static async getCountBuku() {
        try {
            const [rows] = await connection.query(`SELECT COUNT(id) as total_buku FROM buku WHERE status_data = 'Tampil'`)
            return rows
        } catch (err) {
            throw err
        }
    }

    static async getNewBuku() {
        try {
            const [rows] = await connection.query(`SELECT b.judul, b.isbn_issn, b.no_klasifikasi, CONCAT(r.kode_rak, ' - ', ru.kode_ruangan, ' - ', l.kode_lantai) as lokasi_buku FROM buku b LEFT JOIN rak r ON b.id_rak = r.id LEFT JOIN ruangan ru ON r.id_ruangan = ru.id LEFT JOIN lantai l ON ru.id_lantai = l.id WHERE b.status_data = 'Tampil' ORDER BY b.dibuat_pada desc LIMIT 5`)
            return rows
        } catch (err) {
            throw err
        }
    }

    static async getCountBukuHapus() {
        try {
            const [rows] = await connection.query(`SELECT COUNT(id) as total_buku_hapus FROM buku WHERE status_data = 'Hapus'`)
            return rows
        } catch (err) {
            throw err
        }
    }

    static async getNewBukuHapus() {
        try {
            const [rows] = await connection.query(`SELECT b.judul, b.isbn_issn, b.no_klasifikasi, CONCAT(r.kode_rak, ' - ', ru.kode_ruangan, ' - ', l.kode_lantai) as lokasi_buku FROM buku b LEFT JOIN rak r ON b.id_rak = r.id LEFT JOIN ruangan ru ON r.id_ruangan = ru.id LEFT JOIN lantai l ON ru.id_lantai = l.id WHERE b.status_data = 'Hapus' ORDER BY b.dihapus_pada DESC LIMIT 5`
            )
            return rows
        } catch (err) {
            throw err
        }
    }

    static async getAllBukuHapus() {
        try {
            const [rows] = await connection.query(`SELECT b.id, b.judul, b.foto_cover, b.isbn_issn, b.no_klasifikasi, b.bahasa, b.jumlah_halaman, b.tahun_terbit, b.sinopsis, b.tempat_terbit, b.penerbit, b.kategori, b.pengarang, CONCAT(r.kode_rak, ' - ', ru.kode_ruangan, ' - ', l.kode_lantai) AS lokasi_buku, b.ketersediaan, b.dihapus_pada, b.dihapus_oleh, b.status_data FROM buku b LEFT JOIN rak r ON b.id_rak = r.id LEFT JOIN ruangan ru ON r.id_ruangan = ru.id LEFT JOIN lantai l ON ru.id_lantai = l.id WHERE b.status_data = 'Hapus'`)
            return rows
        } catch (err) {
            throw err
        }
    }

    static async updateStatusData(data, id) {
        try {
            const [result] = await connection.query(`UPDATE buku SET ? WHERE id = ?`, [data, id])
            return result
        } catch (err) {
            throw err
        }
    }

    static async getByIdHapus(id) {
        try {
            const [rows] = await connection.query(`SELECT b.id, b.judul, b.foto_cover, b.isbn_issn, b.no_klasifikasi, b.bahasa, b.jumlah_halaman, b.tahun_terbit, b.sinopsis, b.tempat_terbit, b.penerbit, b.kategori, b.pengarang, id_rak, b.ketersediaan, b.dibuat_pada, b.diubah_pada, b.dibuat_oleh, b.diubah_oleh, b.status_data FROM buku b LEFT JOIN rak r ON b.id_rak = r.id LEFT JOIN ruangan ru ON r.id_ruangan = ru.id LEFT JOIN lantai l ON ru.id_lantai = l.id WHERE b.status_data = 'Hapus' AND b.id = ?`, [id])
            return rows[0]
        } catch (err) {
            throw err
        }
    }

    static async searchJudulBuku(judul) {
        try {
            const [rows] = await connection.query(`SELECT b.id, b.judul, b.foto_cover, b.isbn_issn, b.no_klasifikasi, CONCAT(r.kode_rak, ' - ', ru.kode_ruangan, ' - ', l.kode_lantai) AS lokasi_buku FROM buku b LEFT JOIN rak r ON b.id_rak = r.id LEFT JOIN ruangan ru ON r.id_ruangan = ru.id LEFT JOIN lantai l ON ru.id_lantai = l.id WHERE b.status_data = 'Tampil' AND b.judul LIKE CONCAT('%', ?, '%')`, [judul])
            return rows
        } catch (err) {
            throw err
        }
    }
}

module.exports = modelBuku
