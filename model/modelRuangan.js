const connection = require('../config/database')

// membuat class yang berisi CRUD pada tabel ruangan
class ModelRuangan {
    // mengambil semua data pada tabel ruangan (join dengan lantai)
    static async getAll() {
        try {
            const [rows] = await connection.query(`SELECT r.id, r.kode_ruangan, l.kode_lantai FROM ruangan AS r LEFT JOIN lantai AS l ON r.id_lantai = l.id`)
            return rows
        } catch (err) {
            throw err
        }
    }

    // menyimpan data baru pada tabel ruangan
    static async store(data) {
        try {
            const [result] = await connection.query(`INSERT INTO ruangan SET ?`,[data])
            return result
        } catch (err) {
            throw err
        }
    }

    // mengupdate data pada tabel ruangan berdasarkan id
    static async update(data, id) {
        try {
            const [result] = await connection.query(`UPDATE ruangan SET ? WHERE id = ?`,[data, id])
            return result
        } catch (err) {
            throw err
        }
    }

    // mengambil satu data ruangan berdasarkan id
    static async getById(id) {
        try {
            const [rows] = await connection.query(`SELECT * FROM ruangan WHERE id = ?`,[id])
            return rows[0] || null
        } catch (err) {
            throw err
        }
    }

    // menghapus data pada tabel ruangan berdasarkan id
    static async delete(id) {
        try {
            const [result] = await connection.query(`DELETE FROM ruangan WHERE id = ?`,[id])
            return result
        } catch (err) {
            throw err
        }
    }

    // cek apakah kode_ruangan sudah ada
    static async checkKodeRuangan(data) {
        try {
            const [rows] = await connection.query(`SELECT * FROM ruangan WHERE kode_ruangan = ?`,[data.kode_ruangan])
            return rows.length > 0
        } catch (err) {
            throw err
        }
    }
}

module.exports = ModelRuangan
