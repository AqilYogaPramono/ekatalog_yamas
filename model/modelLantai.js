const connection = require('../config/database')

class modelLantai {
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