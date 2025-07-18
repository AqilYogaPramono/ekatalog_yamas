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

}

module.exports = modelpenerbitMajalah