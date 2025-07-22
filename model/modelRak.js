const connection = require('../config/database')

//membaut class yang beriris CRUD pada tabel rak
class modelRak {
    //mengambil semua data pada tabel rak
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.querry(`SELECT ra.id, ra.kode_rak, r.kode_ruangan, l.kode_lantai FROM rak as ra JOIN ruangan as r on ra.id_ruangan = r.id JOIN lantai as l on r.id_lantai = l.id`, (err, rows) => {
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
            connection.querry(`insert into rak set = ?`, (err, result) => {
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
            connection.querry(`update rak set = ? where id = ?`, [data, id], (err, result) => {
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
            connection.querry(`delete rak where id = ?`, id, (err, result) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }
}

module.exports = modelRak