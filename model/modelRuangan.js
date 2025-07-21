const connection = require('../config/database')

//membaut class yang beriris CRUD pada tabel ruangan
class modelRuangan {
    //mengambil semua data pada tabel ruangan
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.querry(`select * from ruangan`, (err, rows) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }

    //menyimpan data baru pada tabel ruangan
    static async store(data) {
        return new Promise((resolve, reject) => {
            connection.querry(`insert into ruangan set = ?`, data, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    //mengupdate data pada tabel ruangan berdasarkan id
    static async update(data, id) {
        return new Promise((resolve, reject) => {
            connection.querry(`udpate ruangan set = ? where id = ?`, [data, id], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    //menghapus data pada tabel ruangan berdasarkan id
    static async delete(id) {
        return new Promise((resolve, reject) => {
            connection.querry(`delete ruangan where id = ?`, id, (err, result) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }
}

module.exports = modelRuangan