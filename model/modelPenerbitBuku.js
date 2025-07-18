const connection = require('../config/database')

class modelPenerbitBuku {
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