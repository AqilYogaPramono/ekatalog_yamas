const connection = require('../config/database')

class modelKoran {
    static async getKoran(limit, offset) {
        try {
            const [rows] = await connection.query('SELECT k.id, pk.nama_penerbit, k.tahun, k.bulan FROM koran k LEFT JOIN penerbit_koran pk ON k.id_penerbit_koran = pk.id WHERE k.status_data = "Tampil" ORDER BY k.dibuat_pada DESC LIMIT ? OFFSET ?', [limit, offset])
            return rows
        } catch (err) {
            throw err
        }
    }

    static async getKoranById(id) {
        try {
            const [rows] = await connection.query(`SELECT k.id, k.id_penerbit_koran, pk.nama_penerbit, k.tahun, k.bulan, k.ketersediaan, k.dibuat_pada, k.diubah_pada, k.dibuat_oleh, k.diubah_oleh FROM koran k LEFT JOIN penerbit_koran pk ON k.id_penerbit_koran = pk.id WHERE k.status_data = 'Tampil' AND k.id = ?`, [id])
            return rows[0]
        } catch (err) {
            throw err
        }
    }

    static async searchKoranTampil(data) {
        try {
            const [rows] = await connection.query(`SELECT k.id, pk.nama_penerbit, k.tahun, k.bulan, k.ketersediaan FROM koran k JOIN penerbit_koran pk ON k.id_penerbit_koran = pk.id WHERE k.id_penerbit_koran = ? AND k.tahun = ? AND k.bulan = ? AND k.status_data = 'Tampil' ORDER BY k.dibuat_pada DESC`, [data.id_penerbit_koran, data.tahun, data.bulan])
            return rows
        } catch (err) {
            throw err
        }
    }

    static async checkKoran(data) {
        try {
            const [rows] = await connection.query(`SELECT id FROM koran WHERE id_penerbit_koran = ? AND tahun = ? AND bulan = ? AND status_data = 'Tampil' LIMIT 1`, [data.id_penerbit_koran, data.tahun, data.bulan])
            return rows.length > 0
        } catch (err) {
            throw err
        }
    }

    static async store(data) {
        try {
            const [rows] = await connection.query('INSERT INTO koran SET ?', [data])
            return rows
        } catch (err) {
            throw err
        }
    }

    static async update(data, id) {
        try {
            const [rows] = await connection.query('UPDATE koran SET ? WHERE id = ?', [data, id])
            return rows
        } catch (err) {
            throw err
        }
    }

    static async softDelete(user, id) {
        try {
            const [rows] = await connection.query('UPDATE koran SET status_data = "Hapus", dihapus_pada = NOW(), dihapus_oleh = ? WHERE id = ?', [user.nama, id])
            return rows
        } catch (err) {
            throw err
        }
    }
}

module.exports = modelKoran