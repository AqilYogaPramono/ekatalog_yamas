const connection = require('../config/database')
const bcrypt = require('bcryptjs')

class ModelPengurus {
    // Login berdasarkan email
    static async login(data) {
        try {
            const [rows] = await connection.query('SELECT * FROM pengurus WHERE email = ?',[data.email])
            return rows[0]
        } catch (err) {
            throw err
        }
    }

    // Ambil pengurus berdasarkan ID
    static async getPengurusById(pengurusId) {
        try {
            const [rows] = await connection.query('SELECT * FROM pengurus WHERE id = ?',[pengurusId])
            return rows[0]
        } catch (err) {
            throw err
        }
    }

    //Ambil semua akun dengan role Pengurus 
    static async getAccount() {
        try {
            const [rows] = await connection.query('SELECT id, nama, email FROM pengurus WHERE peran = "Pengurus"')
            return rows
        } catch (err) {
            throw err
        }
    }

    //Registrasi akun baru (hash password otomatis) 
    static async register(data) {
        try {
            const kata_sandi_hash = await bcrypt.hash(data.kata_sandi, 10)
            const dataRegister = {nama: data.nama,email: data.email, kata_sandi: kata_sandi_hash,peran: 'Pengurus', status_akun: 'Proses'}

            const [result] = await connection.query('INSERT INTO pengurus SET ?',[dataRegister])
            return result
        } catch (err) {
            throw err
        }
    }

    //Hapus akun permanen 
    static async deleteAccount(id) {
        try {
            const [result] = await connection.query('DELETE FROM pengurus WHERE id = ?',[id])
            return result
        } catch (err) {
            throw err
        }
    }

    //Hitung pengurus dengan status akun "Proses" 
    static async getPengurusProses() {
        try {
            const [rows] = await connection.query('SELECT COUNT(id) AS pengurus_proses FROM pengurus WHERE status_akun = "Proses"')
            return rows[0]
        } catch (err) {
            throw err
        }
    }

    //Hitung pengurus dengan status akun "Aktif" 
    static async getPengurusAktif() {
        try {
            const [rows] = await connection.query('SELECT COUNT(id) AS pengurus_aktif FROM pengurus WHERE status_akun = "Aktif" AND peran = "Pengurus"')
            return rows[0]
        } catch (err) {
            throw err
        }
    }

    //Cek apakah email sudah terdaftar 
    static async checkEmail(email) {
        try {
            const [rows] = await connection.query('SELECT email FROM pengurus WHERE email = ?',[email])
            return rows.length > 0
        } catch (err) {
            throw err
        }
    }

    //Update status akun (Aktivasi / Nonaktif) 
    static async updateStatusAccount(data, id) {
        try {
            const [result] = await connection.query('UPDATE pengurus SET ? WHERE id = ?',[data, id])
            return result
        } catch (err) {
            throw err
        }
    }

    // Update password (hash baru)
    static async updatePassword(data, idPengurus) {
        try {
            const kata_sandi_hash = await bcrypt.hash(data.kata_sandi_baru, 10)
            const dataUpdate = { kata_sandi: kata_sandi_hash }

            const [result] = await connection.query('UPDATE pengurus SET ? WHERE id = ?',[dataUpdate, idPengurus])
            return result
        } catch (err) {
            throw err
        }
    }
}

module.exports = ModelPengurus
