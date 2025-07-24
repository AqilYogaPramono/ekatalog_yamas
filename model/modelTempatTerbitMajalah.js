const connection = require('../config/database')

//membaut class yang beriris CRUD pada tabel temapt terbit majalah
class modelTempatterbitMajalah {
    //mengambil semua data pada tabel temapt terbit majalah
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.querry(`select * from tempat_terbit_majalah`, (err, rows) => {
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
            connection.querry(`insert into tempat_terbit_majalah`, data, (err, result) => {
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
            connection.querry(`udpate tempat_terbit_majalah set ? where id = ?`, [data, id], (err, result) => {
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
            connection.querry(`delete tempat_terbit_majalah where id = ?`, id, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }
}

module.exports = modelTempatterbitMajalah