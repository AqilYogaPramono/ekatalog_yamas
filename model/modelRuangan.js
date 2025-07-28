const connection = require('../config/database')

//membaut class yang beriris CRUD pada tabel ruangan
class modelRuangan {
    //mengambil semua data pada tabel ruangan
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT r.id, r.kode_ruangan, l.kode_lantai from ruangan as r JOIN lantai as l on r.id_lantai = l.id`, (err, rows) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }

    //menyimpan data baru pada tabel ruangan
    static async store(data) {
        return new Promise((resolve, reject) => {
            connection.query(`insert into ruangan set ?`, data, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    //mengupdate data pada tabel ruangan berdasarkan id
    static async update(data, id) {
        return new Promise((resolve, reject) => {
            connection.query(`update ruangan set ? where id = ?`, [data, id], (err, result) => {
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
            connection.query(`select * from ruangan where id = ?`, id, (err, rows) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows[0])
                }
            })
        })
    }

    //menghapus data pada tabel ruangan berdasarkan id
    static async delete(id) {
        return new Promise((resolve, reject) => {
            connection.query(`delete from ruangan where id = ?`, id, (err, result) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    static async checkKodeRuangan(data) {
        return new Promise((resolve, reject) => {
            connection.query(`select * from ruangan where kode_ruangan = ?`, [data.kode_ruangan], (err, rows) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows.length > 0)
                }
            })
        })
    }
}

module.exports = modelRuangan