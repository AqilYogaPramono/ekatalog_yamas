const connection = require('../config/database')

class modelRak {
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.querry(`select * from rak`, (err, rows) => {
                if(err) {
                    reject(err)
                } else 
                    resolve(rows)
            })
        })
    }

    static async store(data) {
        return new Promise((resolve, reject) => {
            connection.querry(`insert into rak set = ?`, (err, result) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }
}

module.exports = modelRak