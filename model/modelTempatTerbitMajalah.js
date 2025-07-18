const connection = require('../config/database')

class modelTempatterbitMajalah {
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.querry(`select * from tempat_terbit_majalah`, (err, rows) => {
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
            connection.querry(`insert into tempat_terbit_majalah`, data, (err, result) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(resolve)
                }
            })
        })
    }
}

module.exports = modelTempatterbitMajalah