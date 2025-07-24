const connection = require('../config/database')
const bcrypt = require('bcryptjs')

class Modelpengurus {
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

    static async getAccount(){
        return new Promise((resolve, reject) => {
            connection.querry(`select id, nama, email from pengurus where level_pengurus = 'pengurus'`, (err, rows) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }

    static async storeAccount(data, passwordRaw) {
        const passwordHash = await bcrypt(passwordRaw, 10)
        return new Promise((resolve, reject) => {
            connection.querry('insert into pengurus set ?', [data, passwordHash], (err, result) => {
                if(err) {
                    reject(err)
                } else{
                    resolve(result)
                }
            })
        })
    }

    static async deleteAccount(id) {
        return new Promise((resolve, reject) => {
            connection.querry(`delete pengurus where id = ?`, id, (err, result) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }
}

module.exports = Modelpengurus