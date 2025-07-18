const { raw } = require('mysql')
const connection = require('../config/database')

class modelTempatTerbitBuku {
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.querry(`select * from tempat_terbit_buku`, (err, rows) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }


}

module.exports = modelTempatTerbitBuku