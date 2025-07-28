const connection = require('../config/database')

//membaut class yang beriris CRUD pada tabel lantai
class modelLantai {
    //mengambil semua data pada tabel lantai
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query(`select * from lantai`, (err, rows) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }

    //menyimpan data baru pada tabel lantai
    static async store(data) {
        return new Promise((resolve, reject) => {
            connection.query(`insert into lantai set ?`, data, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    //mengupdate data pada tabel lantai berdasarkan id
    static async update(data, id) {
        return new Promise((resolve, reject) => {
            connection.query(`update lantai set ? where id = ?`, [data, id], (err, result) => {
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
            connection.query(`select * from lantai where id = ?`, id, (err, rows) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows[0])
                }
            })
        })
    }

    //menghapus data pada tabel lantai berdasarkan id
    static async delete(id) {
        return new Promise((resolve, reject) => {
            connection.query(`delete from lantai where id = ?`, id, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    //memeriksa apakah lantai sudah ada
    static async checkLantai(data) {
        return new Promise((resolve, reject) => {
            connection.query(`select * from lantai where kode_lantai = ?`, data.kode_lantai, (err, rows) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows.length > 0)
                }
            })
        })
    }
}

module.exports = modelLantai