const connection = require('../config/database')

//membaut class yang beriris CRUD pada tabel kategor buku
class modelKategoriBuku {
    //mengambil semua data pada tabel kategori_buku
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query(`select * from kategori_buku`, (err, rows) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }

    //menyimpan data baru pada tabel kategori buku
    static async store(data) {
        return new Promise((resolve, reject) => {
            connection.query(`insert into kategori_buku set ?`, data, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    //mengupdate data pada tabel kategori buku berdasarkan id
    static async update(data, id) {
        return new Promise((resolve, reject) => {
            connection.query(`update kategori_buku set ? where id = ?`, [data, id], (err, result) => {
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
            connection.query(`select * from kategori_buku where id = ?`, id, (err, rows) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows[0])
                }
            })
        })
    }

    //menghapus data pada tabel kategori buku berdasarkan id
    static async delete(id) {
        return new Promise((resolve, reject) => {
            connection.query(`delete from kategori_buku where id = ?`, id, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    //memeriksa apakah kategori buku sudah ada
    static async checkKategoriBuku(data) {
        return new Promise((resolve, reject) => {
            connection.query(`select * from kategori_buku where nama_kategori = ?`, data.nama_kategori, (err, rows) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows.length > 0)
                }
            })
        })
    }
}

module.exports = modelKategoriBuku