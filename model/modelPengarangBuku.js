const connection = require('../config/database')

//membaut class yang beriris CRUD pada tabel pengarang buku
class modelPengarangBuku {
    //mengambil semua data pada tabel pengarang buku
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query(`select * from pengarang_buku`, (err, rows) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }

    //menyimpan data baru pada tabel pengarang buku
    static async store(data) {
        return new Promise((resolve, reject) => {
            connection.query(`insert into pengarang_buku set ?`, data, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    //mengupdate data pada tabel pengarang buku berdasarkan id
    static async update(data, id) {
        return new Promise((resolve, reject) => {
            connection.query(`update pengarang_buku set ? where id = ?`, [data, id], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    //mengambil satu data bahasa berdasarkan id
    static async getById(id) {
        return new Promise((resolve, reject) => {
            connection.query(`select * from pengarang_buku where id = ?`, id, (err, rows) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows[0])
                }
            })
        })
    }

    //menghapus data pada tabel pengarang buku berdasarkan id
    static async delete(id) {
        return new Promise((resolve, reject) => {
            connection.query(`delete from pengarang_buku where id = ?`, id, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    //memeriksa apakah pengarang buku sudah ada
    static async checkPengarangBuku(data) {
        return new Promise((resolve, reject) => {
            connection.query(`select * from pengarang_buku where nama_pengarang = ?`, data.nama_pengarang, (err, rows) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows.length > 0)
                }
            })
        })
    }
}

module.exports = modelPengarangBuku