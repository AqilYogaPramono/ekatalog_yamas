const connection = require('../config/database')

class modelBuku {
    static async getBukuById(id) {
        return new Promise((resolve, reject) => {
            connection.querry(`select `, id, (err, rows) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }
}

module.exports = modelBuku