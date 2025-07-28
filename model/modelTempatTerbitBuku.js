const connection = require('../config/database')

//membaut class yang beriris CRUD pada tabel temapt terbit buku
class modelTempatTerbitBuku {
    //mengambil semua data pada tabel temapt terbit buku
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query(`select * from tempat_terbit_buku`, (err, rows) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }

    //menyimpan data baru pada tabel temapt terbit buku
    static async store(data) {
        return new Promise((resolve, reject) => {
            connection.query('insert into tempat_terbit_buku set ?', data, (err, result) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    //mengupdate data pada tabel temapt terbit buku berdasarkan id
    static async update(data, id) {
        return new Promise((resolve, reject) => {
            connection.query(`update tempat_terbit_buku set ? where id = ?`, [data, id], (err, result) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    //menghapus data pada tabel temapt terbit buku berdasarkan id
    static async delete(id) {
        return new Promise((resolve, reject) => {
            connection.query(`delete from tempat_terbit_buku where id = ?`, id, (err, result) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    static async getById(id) {
        return new Promise((resolve, reject) => {
            connection.query(`select * from tempat_terbit_buku where id = ?`, id, (err, rows) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(rows[0])
                }
            })
        })
    }
}

module.exports = modelTempatTerbitBuku