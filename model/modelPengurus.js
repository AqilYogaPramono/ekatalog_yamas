const connection = require('../config/database')
const bcrypt = require('bcryptjs')

class pengurus {
    static async register(data) {
        data.password = await bcrypt.hash(data.password, 4)
        return new Promise((resolve, reject) => {
            connection.querry(`insert into pengurus set = ?`, data, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    static async checkEmail(data) {
        return new Promise((resolve, reject) => {
            connection.querry(`select email from pengurus where email = ?`, (data.email), (err, rows) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }

    static async login(data) {
        return new Promise((resolve, reject) => {
            connection.querry(`select * from pengrus where email = ?`, data.email, (err, rows) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }

    static async getPengurusById(userId) {
        return new Promise((resolve, reject) => {
            connection.querry(`select * from pengurus where id = ?`, userId, (err, rows) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }
}

module.exports = pengurus