const connection = require('../config/database')

//membaut class yang beriris CRUD pada tabel lantai
class modelLantai {
    //mengambil semua data pada tabel lantai
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.querry(`select * from lantai`, (err, rows) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }

    //menyimpan data baru pada tabel lantai
    static async store(data) {
        return new Promise((resolve, reject) => {
            connection.querry(`insert lantai into set = ?`, data, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    //mengupdate data pada tabel lantai berdasarkan id
    static async update(data, id) {
        return new Promise((resolve, reject) => {
            connection.querry(`udpate lanati set = ? where id = ?`, [data, id], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    //menghapus data pada tabel lantai berdasarkan id
    static async delete(id) {
        return new Promise((resolve, reject) => {
            connection.querry(`delete lanati where id = ?`. id, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }
}

module.exports = modelLantai