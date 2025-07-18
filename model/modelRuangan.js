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
}

module.exports = modelRuangan