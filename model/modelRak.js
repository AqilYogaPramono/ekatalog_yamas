const connection = require('../config/database')

// membuat class yang berisi CRUD pada tabel rak
class ModelRak {
    // mengambil semua data pada tabel rak (join dengan ruangan & lantai)
    static async getAll() {
        try {
            const [rows] = await connection.query(`SELECT ra.id, ra.kode_rak, r.kode_ruangan, l.kode_lantai FROM rak AS ra LEFT JOIN ruangan AS r ON ra.id_ruangan = r.id LEFT JOIN lantai AS l ON r.id_lantai = l.id ORDER BY id ASC`)
            return rows
        } catch (err) {
            throw err
        }
    }

    // menyimpan data baru pada tabel rak
    static async store(data) {
        try {
            const [result] = await connection.query(`INSERT INTO rak SET ?`,[data])
            return result
        } catch (err) {
            throw err
        }
    }

    // mengupdate data pada tabel rak berdasarkan id
    static async update(data, id) {
        try {
            const [result] = await connection.query(`UPDATE rak SET ? WHERE id = ?`,[data, id])
            return result
        } catch (err) {
            throw err
        }
    }

    // menghapus data pada tabel rak berdasarkan id
    static async delete(id) {
        try {
            const [result] = await connection.query(`DELETE FROM rak WHERE id = ?`,[id])
            return result
        } catch (err) {
            throw err
        }
    }

    // cek apakah kode_rak sudah ada
    static async checkRak(data) {
        try {
            const [rows] = await connection.query(`SELECT kode_rak FROM rak WHERE kode_rak = ?`,[data.kode_rak])
            return rows.length > 0
        } catch (err) {
            throw err
        }
    }

    // mengambil satu data rak berdasarkan id
    static async getById(id) {
        try {
            const [rows] = await connection.query(`SELECT * FROM rak WHERE id = ?`,[id])
            return rows[0] || null
        } catch (err) {
            throw err
        }
    }
}

module.exports = ModelRak
