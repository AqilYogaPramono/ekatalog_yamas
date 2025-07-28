const connection = require('../config/database')

//membaut class yang beriris CRUD pada tabel bahasa
class modelBahasa {
    //mengambil semua data pada tabel bahasa
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

    //menyimpan data baru pada tabel bahasa
    static async store(data) {
        return new Promise((resolve, reject) => {
            connection.query(`insert into bahasa set ?`, data, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    //mengupdate data pada tabel bahasa berdasarkan id
    static async update(data, id) {
        return new Promise((resolve, reject) => {
            connection.query(`update bahasa set ? where id = ?`, [data, id], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    //menghapus data pada tabel bahasa berdasarkan id
    static async delete(id) {
        return new Promise((resolve, reject) => {
            connection.query(`delete from bahasa where id = ?`, id, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    //mengambil satu data bahasa berdasarkan id
    static async getById(id) {
        return new Promise((resolve, reject) => {
            connection.query(`select * from bahasa where id = ?`, id, (err, rows) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows[0])
                }
            })
        })
    }

    static async checkBahasa(data) {
        return new Promise((resolve, reject) => {
            connection.query(`select * from bahasa where bahasa = ?`, [data.bahasa], (err, rows) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows.length > 0)
                }
            })
        })
    }
}

module.exports = modelBahasa