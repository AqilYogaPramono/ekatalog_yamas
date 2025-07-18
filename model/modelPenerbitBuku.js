const connection = require('../config/database')

class modelPenerbitBuku {
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.querry(`select * from penerbit_buku`, (err, rows) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }
}

module.exports = modelPenerbitBuku