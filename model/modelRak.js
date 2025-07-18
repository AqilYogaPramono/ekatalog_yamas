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
}

module.exports = modelRak