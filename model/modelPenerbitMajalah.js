const connection = require('../config/database')

class modelpenerbitMajalah {
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.qurry(`select * from penerbit_majalah`, (err, rows) => {
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
            connection.qurry(`insert into penerbit_majalah`, (err, result) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }
}

module.exports = modelpenerbitMajalah