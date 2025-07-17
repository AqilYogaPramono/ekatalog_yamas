const connection = require('../config/database')

class modelBahasa {
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query(`select * from bahasa`, (err, rows) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }

    static async store(data) {
        return new Promise((resolve, reject) => {
            connection.query(`insert into bahasa set = ?`, data, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

}

module.exports = modelBahasa