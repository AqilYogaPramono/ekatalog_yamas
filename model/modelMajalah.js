const connection = require('../config/database')

class ModelMajalah {
    static async getDetailMajalah(id) {
        try {
            const [rows] = await connection.query(`SELECT m.judul, m.foto_cover, m.edisi, m.no_klasifikasi, m.bahasa, m.tahun_terbit, m.sinopsis, m.tempat_terbit, m.penerbit, CONCAT(r.kode_rak, ' - ', ru.kode_ruangan, ' - ', l.kode_lantai) AS lokasi FROM majalah m LEFT JOIN rak r ON m.id_rak = r.id LEFT JOIN ruangan ru ON r.id_ruangan = ru.id LEFT JOIN lantai l ON ru.id_lantai = l.id WHERE m.id = ? AND m.status_data = 'Tampil'`,[id])
            return rows
        } catch (err) {
            throw err
        }
    }

    static async getMajalah(limit, offset) {
        try {
            const [rows] = await connection.query(`SELECT m.id, m.judul, m.foto_cover, m.edisi, m.no_klasifikasi, CONCAT(r.kode_rak, ' - ', ru.kode_ruangan, ' - ', l.kode_lantai) AS lokasi_majalah FROM majalah m LEFT JOIN rak r ON m.id_rak = r.id LEFT JOIN ruangan ru ON r.id_ruangan = ru.id LEFT JOIN lantai l ON ru.id_lantai = l.id WHERE m.status_data = 'Tampil' ORDER BY m.dibuat_pada DESC LIMIT ? OFFSET ?`, [limit, offset])
            return rows
        } catch (err) {
            throw err
        }
    }

    static async getById(id) {
        try {
            const [rows] = await connection.query(`SELECT m.id, m.judul, m.foto_cover, m.edisi, m.no_klasifikasi, m.bahasa, m.tahun_terbit, m.sinopsis, m.tempat_terbit, m.penerbit, m.id_rak, r.kode_rak, ru.kode_ruangan, l.kode_lantai, m.ketersediaan, m.dibuat_pada, m.diubah_pada, m.dibuat_oleh, m.diubah_oleh, m.status_data FROM majalah m LEFT JOIN rak r ON m.id_rak = r.id LEFT JOIN ruangan ru ON r.id_ruangan = ru.id LEFT JOIN lantai l ON ru.id_lantai = l.id WHERE m.status_data = 'Tampil' AND m.id = ?`,[id])
            return rows[0]
        } catch (err) {
            throw err
        }
    }

    static async store(data) {
        try {
            const [results] = await connection.query(`INSERT INTO majalah SET ?`, [data])
            return results
        } catch (err) {
            throw err
        }
    }

    static async update(id, data) {
        try {
            const [results] = await connection.query(`UPDATE majalah SET ? WHERE id = ?`, [data, id])
            return results
        } catch (err) {
            throw err
        }
    }

    static async hardDelete(id) {
        try {
            const [results] = await connection.query(`DELETE FROM majalah WHERE id = ?`, [id])
            return results
        } catch (err) {
            throw err
        }
    }

    static async softDelete(user, id) {
        try {
            const [results] = await connection.query(`UPDATE majalah SET status_data = 'Hapus', dihapus_pada = NOW(), dihapus_oleh = ? WHERE id = ?`,[user.nama, id]
            )
            return results
        } catch (err) {
            throw err
        }
    }

    static async checkNoKlasifikasiCreate(data) {
        try {
            const [rows] = await connection.query(`SELECT * FROM majalah WHERE no_klasifikasi = ?`, [data.no_klasifikasi])
            return rows.length > 0
        } catch (err) {
            throw err
        }
    }

    static async checkNoKlasifikasiEdit(data, id) {
        try {
            const [rows] = await connection.query(`SELECT * FROM majalah WHERE no_klasifikasi = ? AND id != ?`,[data.no_klasifikasi, id])
            return rows.length > 0
        } catch (err) {
            throw err
        }
    }

    static async checkISBNOrISSN(data) {
        try {
            const [rows] = await connection.query(`SELECT * FROM majalah WHERE isbn_issn = ?`,[data.isbn_issn])
            return rows.length > 0
        } catch (err) {
            throw err
        }
    }

    static async getCountMajalah() {
        try {
            const [rows] = await connection.query(`SELECT COUNT(id) AS total_majalah FROM majalah WHERE status_data = 'Tampil'`)
            return rows
        } catch (err) {
            throw err
        }
    }

    static async getNewMajalah() {
        try {
            const [rows] = await connection.query(`SELECT m.judul, m.edisi, m.no_klasifikasi, CONCAT(r.kode_rak, ' - ', ru.kode_ruangan, ' - ', l.kode_lantai) AS lokasi_majalah FROM majalah m LEFT JOIN rak r ON m.id_rak = r.id LEFT JOIN ruangan ru ON r.id_ruangan = ru.id LEFT JOIN lantai l ON ru.id_lantai = l.id WHERE m.status_data = 'Tampil' ORDER BY m.dibuat_pada DESC LIMIT 5`)
            return rows
        } catch (err) {
            throw err
        }
    }

    static async getNewMajalahHapus() {
        try {
            const [rows] = await connection.query(`SELECT m.judul, m.edisi, m.no_klasifikasi, CONCAT(r.kode_rak, ' - ', ru.kode_ruangan, ' - ', l.kode_lantai) AS lokasi_majalah FROM majalah m LEFT JOIN rak r ON m.id_rak = r.id LEFT JOIN ruangan ru ON r.id_ruangan = ru.id LEFT JOIN lantai l ON ru.id_lantai = l.id WHERE m.status_data = 'Hapus' ORDER BY m.dihapus_pada DESC LIMIT 5`)
            return rows
        } catch (err) {
            throw err
        }
    }

    static async getCountMajalahHapus() {
        try {
            const [rows] = await connection.query(`SELECT COUNT(id) AS total_majalah FROM majalah WHERE status_data = 'Hapus'`)
            return rows
        } catch (err) {
            throw err
        }
    }

    static async getMajalahHapus(limit, offset) {
        try {
            const [rows] = await connection.query(`SELECT m.id, m.judul, m.foto_cover, m.edisi, m.no_klasifikasi, CONCAT(r.kode_rak, ' - ', ru.kode_ruangan, ' - ', l.kode_lantai) AS lokasi_majalah FROM majalah m LEFT JOIN rak r ON m.id_rak = r.id LEFT JOIN ruangan ru ON r.id_ruangan = ru.id LEFT JOIN lantai l ON ru.id_lantai = l.id WHERE m.status_data = 'Hapus' ORDER BY m.dihapus_pada DESC LIMIT ? OFFSET ?`, [limit, offset])
            return rows
        } catch (err) {
            throw err
        }
    }

    static async updateStatusData(data, id) {
        try {
            const [results] = await connection.query(`UPDATE majalah SET ? WHERE id = ?`, [data, id])
            return results
        } catch (err) {
            throw err
        }
    }

    static async searchJudulMajalah(judul) {
        try {
            const [rows] = await connection.query(`SELECT m.id, m.judul, m.foto_cover, m.edisi, m.no_klasifikasi, CONCAT(r.kode_rak, ' - ', ru.kode_ruangan, ' - ', l.kode_lantai) AS lokasi_majalah FROM majalah m LEFT JOIN rak r ON m.id_rak = r.id LEFT JOIN ruangan ru ON r.id_ruangan = ru.id LEFT JOIN lantai l ON ru.id_lantai = l.id WHERE m.status_data = 'Tampil' AND m.judul LIKE CONCAT('%', ?, '%')`, [judul])
            return rows
        } catch (err) {
            throw err
        }
    }

    static async searchJudulMajalahHapus(judul) {
        try {
            const [rows] = await connection.query(`SELECT m.id, m.judul, m.foto_cover, m.edisi, m.no_klasifikasi, CONCAT(r.kode_rak, ' - ', ru.kode_ruangan, ' - ', l.kode_lantai) AS lokasi_majalah FROM majalah m LEFT JOIN rak r ON m.id_rak = r.id LEFT JOIN ruangan ru ON r.id_ruangan = ru.id LEFT JOIN lantai l ON ru.id_lantai = l.id WHERE m.status_data = 'Hapus' AND m.judul LIKE CONCAT('%', ?, '%')`, [judul])
            return rows
        } catch (err) {
            throw err
        }
    }

    static async getByIdHapus(id) {
        try {
            const [rows] = await connection.query(`SELECT m.id, m.judul, m.foto_cover, m.edisi, m.no_klasifikasi, m.bahasa, m.tahun_terbit, m.sinopsis, m.tempat_terbit, m.penerbit, m.id_rak, r.kode_rak, ru.kode_ruangan, l.kode_lantai, m.ketersediaan, m.dihapus_pada, m.dihapus_oleh, m.status_data FROM majalah m LEFT JOIN rak r ON m.id_rak = r.id LEFT JOIN ruangan ru ON r.id_ruangan = ru.id LEFT JOIN lantai l ON ru.id_lantai = l.id WHERE m.status_data = 'Hapus' AND m.id = ?`,[id])
            return rows[0]
        } catch (err) {
            throw err
        }
    }
}

module.exports = ModelMajalah
