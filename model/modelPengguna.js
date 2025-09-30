const connection = require('../config/database')
const bcrypt = require('bcryptjs')

class ModelPengguna {
    // Login berdasarkan NP`
    static async login(data) {
        try {
            const [rows] = await connection.query('SELECT * FROM pengguna WHERE NP = ?',[data.NP])
            return rows[0]
        } catch (err) {
            throw err
        }
    }

    // Ambil pengguna berdasarkan ID
    static async getPenggunaById(penggunaId) {
        try {
            const [rows] = await connection.query('SELECT * FROM pengguna WHERE id = ?',[penggunaId])
            return rows[0]
        } catch (err) {
            throw err
        }
    }

    //Ambil semua akun dengan role Pustakawan
    static async getAccount() {
        try {
            const [rows] = await connection.query('SELECT id, nama, NP FROM pengguna WHERE peran = "Pustakawan"')
            return rows
        } catch (err) {
            throw err
        }
    }

    //Registrasi pustakawan akun baru (hash password otomatis) 
    static async registerPustakawan(data) {
        try {
            const kata_sandi_hash = await bcrypt.hash(data.kata_sandi, 10)
            const dataRegister = {nama: data.nama,NP: data.NP, kata_sandi: kata_sandi_hash,peran: 'Pustakawan', status_akun: 'Proses'}

            const [result] = await connection.query('INSERT INTO pengguna SET ?',[dataRegister])
            return result
        } catch (err) {
            throw err
        }
    }

    //Registrasi manajer akun baru (hash password otomatis) 
    static async registerManajer(data) {
        try {
            const kata_sandi_hash = await bcrypt.hash(data.kata_sandi, 10)
            const dataRegister = {nama: data.nama, NP: data.NP, kata_sandi: kata_sandi_hash,peran: 'Manajer', status_akun: 'Proses'}

            const [result] = await connection.query('INSERT INTO pengguna SET ?',[dataRegister])
            return result
        } catch (err) {
            throw err
        }
    }

    //Hapus akun permanen 
    static async deleteAccount(id) {
        try {
            const [result] = await connection.query('DELETE FROM pengguna WHERE id = ?',[id])
            return result
        } catch (err) {
            throw err
        }
    }

    //Hitung pengguna dengan status akun "Proses" 
    static async getPustakawanProses() {
        try {
            const [rows] = await connection.query('SELECT COUNT(id) AS pengguna_proses FROM pengguna WHERE status_akun = "Proses" AND peran = "Pustakawan"')
            return rows[0]
        } catch (err) {
            throw err
        }
    }

    //Hitung pengguna dengan status akun "Aktif" 
    static async getPustakawanAktif() {
        try {
            const [rows] = await connection.query('SELECT COUNT(id) AS pengguna_aktif FROM pengguna WHERE status_akun = "Aktif" AND peran = "Pustakawan"')
            return rows[0]
        } catch (err) {
            throw err
        }
    }

    //Cek apakah NP pustakawan sudah terdaftar 
    static async checkNPPustakawan(NP) {
        try {
            const [rows] = await connection.query('SELECT NP FROM pengguna WHERE NP = ? and peran = "Pustakawan"',[NP])
            return rows.length > 0
        } catch (err) {
            throw err
        }
    }

    //Cek apakah NP manajer sudah terdaftar 
    static async checkNPManajer(NP) {
        try {
            const [rows] = await connection.query('SELECT NP FROM pengguna WHERE NP = ? and peran = "Manajer"',[NP])
            return rows.length > 0
        } catch (err) {
            throw err
        }
    }

    //Update status akun (Aktivasi / Nonaktif) 
    static async updateStatusAccount(data, id) {
        try {
            const [result] = await connection.query('UPDATE pengguna SET ? WHERE id = ?',[data, id])
            return result
        } catch (err) {
            throw err
        }
    }

    // Update password (hash baru)
    static async updatePassword(data, idPengguna) {
        try {
            const kata_sandi_hash = await bcrypt.hash(data.kata_sandi_baru, 10)
            const dataUpdate = { kata_sandi: kata_sandi_hash }

            const [result] = await connection.query('UPDATE pengguna SET ? WHERE id = ?',[dataUpdate, idPengguna])
            return result
        } catch (err) {
            throw err
        }
    }
}

module.exports = ModelPengguna
