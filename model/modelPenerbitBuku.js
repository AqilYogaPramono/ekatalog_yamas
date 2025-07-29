const connection = require('../config/database')

//membaut class yang beriris CRUD pada tabel penerbit buku
class modelPenerbitBuku {
    //mengambil semua data pada tabel penerbit buku
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query(`select * from penerbit_buku`, (err, rows) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }

    //menyimpan data baru pada tabel penerbit buku
    static async store(data) {
        return new Promise((resolve, reject) => {
            connection.query(`insert into penerbit_buku set ?`, data, (err, result) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    //mengupdate data pada tabel penerbit buku berdasarkan id
    static async update(data, id) {
        return new Promise((resolve, reject) => {
            connection.query(`update penerbit_buku set ? where id = ?`, [data, id], (err, result) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    //menghapus data pada tabel penerbit buku berdasarkan id
    static async delete(id) {
        return new Promise((resolve, reject) => {
            connection.query(`delete from penerbit_buku where id = ?`, id, (err, result) => {
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
            connection.query(`select * from penerbit_buku where id = ?`, id, (err, rows) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(rows[0])
                }
            })
        })
    }
}

module.exports = modelPenerbitBuku