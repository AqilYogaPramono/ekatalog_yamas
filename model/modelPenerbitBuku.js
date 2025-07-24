const connection = require('../config/database')

//membaut class yang beriris CRUD pada tabel penerbit buku
class modelPenerbitBuku {
    //mengambil semua data pada tabel penerbit buku
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.querry(`select * from penerbit_buku`, (err, rows) => {
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
            connection.querry(`insert into penerbit_buku set = ?`, data, (err, result) => {
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
            connection.querry(`udpate penerbit_buku set = ? where id = ?`, [data, id], (err, result) => {
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
            connection.querry(`delete penerbit_buku where id = ?`, id, (err, result) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }
}

module.exports = modelPenerbitBuku