const connection = require('../config/database')

class modelRuangan {
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

    
}

module.exports = modelRuangan