const connection = require('../config/database')

//membaut class yang beriris CRUD pada tabel rak
class modelRak {
    //mengambil semua data pada tabel rak
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT ra.id, ra.kode_rak, r.kode_ruangan, l.kode_lantai FROM rak as ra JOIN ruangan as r on ra.id_ruangan = r.id JOIN lantai as l on r.id_lantai = l.id`, (err, rows) => {
                if(err) {
                    reject(err)
                } else 
                    resolve(rows)
            })
        })
    }

    //menyimpan data baru pada tabel rak
    static async store(data) {
        return new Promise((resolve, reject) => {
            connection.query(`insert into rak set ?`, data, (err, result) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    //mengupdate data pada tabel rak berdasarkan id
    static async update(data, id) {
        return new Promise((resolve, reject) => {
            connection.query(`update rak set ? where id = ?`, [data, id], (err, result) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    //menghapus data pada tabel rak berdasarkan id
    static async delete(id) {
        return new Promise((resolve, reject) => {
            connection.query(`delete from rak where id = ?`, id, (err, result) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    static async checkRak(data) {
        return new Promise((resolve, reject) => {
            connection.query(`select kode_rak from rak where kode_rak = ?`, data.kode_rak, (err, rows) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(rows.length > 0)
                }
            })
        })
    }

    static async getById(id) {
        return new Promise((resolve, reject) => {
            connection.query(`select * from rak where id = ?`, id, (err, rows) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }
}

module.exports = modelRak