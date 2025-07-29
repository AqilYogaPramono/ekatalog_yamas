const connection = require('../config/database')

//membaut class yang beriris CRUD pada tabel temapt terbit majalah
class modelTempatterbitMajalah {
    //mengambil semua data pada tabel temapt terbit majalah
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query(`select * from tempat_terbit_majalah`, (err, rows) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }

    //menyimpan data baru pada tabel temapt terbit majalah
    static async store(data) {
        return new Promise((resolve, reject) => {
            connection.query(`insert into tempat_terbit_majalah set ?`, data, (err, result) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(resolve)
                }
            })
        })
    }

    //mengupdate data pada tabel temapt terbit majalah berdasarkan id
    static async update(data, id) {
        return new Promise((resolve, reject) => {
            connection.query(`update tempat_terbit_majalah set ? where id = ?`, [data, id], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    //menghapus data pada tabel temapt terbit majalah berdasarkan id
    static async delete(id) {
        return new Promise((resolve, reject) => {
            connection.query(`delete from tempat_terbit_majalah where id = ?`, id, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    static async getById(id) {
        return new Promise((resolve, reject) => {
            connection.query(`select * from tempat_terbit_majalah where id = ?`, id, (err, rows) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(rows[0])
                }
            })
        })
    }
}

module.exports = modelTempatterbitMajalah