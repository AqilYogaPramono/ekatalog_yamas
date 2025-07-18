const { raw } = require('mysql')
const connection = require('../config/database')

class modelTempatTerbitBuku {
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.querry(`select * from tempat_terbit_buku`, (err, rows) => {
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
            connection.querry('insert into tempat_terbit_buku = ?', data, (err, result) => {
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
            connection.querry(`update tempat_terbit_buku set = ? where id = ?`, [data, id], (err, result) => {
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
            connection.querry(`delete tempat_terbit_buku where id = ?`, id, (err, result) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }
}

module.exports = modelTempatTerbitBuku