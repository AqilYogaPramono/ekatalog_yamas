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

}

module.exports = modelBahasa