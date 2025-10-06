const connection = require('../config/database')

// membuat class yang berisi CRUD pada tabel lantai
class modelLantai {
    // mengambil semua data pada tabel lantai
    static async getAll() {
        try {
            const [rows] = await connection.query(`SELECT * FROM lantai ORDER BY id ASC`)
            return rows
        } catch (err) {
            throw err
        }
    }

    // menyimpan data baru pada tabel lantai
    static async store(data) {
        try {
            const [result] = await connection.query(`INSERT INTO lantai SET ?`, [data])
            return result
        } catch (err) {
            throw err
        }
    }

    // mengupdate data pada tabel lantai berdasarkan id
    static async update(data, id) {
        try {
            const [result] = await connection.query(`UPDATE lantai SET ? WHERE id = ?`, [data, id])
            return result
        } catch (err) {
            throw err
        }
    }

    // mengambil satu data lantai berdasarkan id
    static async getById(id) {
        try {
            const [rows] = await connection.query(`SELECT * FROM lantai WHERE id = ?`, [id])
            return rows[0]
        } catch (err) {
            throw err
        }
    }

    // menghapus data pada tabel lantai berdasarkan id
    static async delete(id) {
        try {
            const [result] = await connection.query(`DELETE FROM lantai WHERE id = ?`, [id])
            return result
        } catch (err) {
            throw err
        }
    }

    // memeriksa apakah kode_lantai sudah ada
    static async checkLantai(data) {
        try {
            const [rows] = await connection.query(`SELECT * FROM lantai WHERE kode_lantai = ?`, [data.kode_lantai])
            return rows.length > 0
        } catch (err) {
            throw err
        }
    }

    // memeriksa apakah lantai sudah digunakan
    static async checkLantaiUsed(id) {
        try {
            const [rows] = await connection.query(`SELECT * FROM ruangan WHERE id_lantai = ?`, [id])
            return rows.length > 0
        } catch (err) {
            throw err
        }
    }
}

module.exports = modelLantai
