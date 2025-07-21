const connection = require('../config/database')

//membaut class yang beriris CRUD pada tabel penerbit majalah
class modelpenerbitMajalah {
    //mengambil semua data pada tabel penerbit majalah
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.qurry(`select * from penerbit_majalah`, (err, rows) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }

    //menyimpan data baru pada tabel penerbit majalah
    static async store(data) {
        return new Promise((resolve, reject) => {
            connection.qurry(`insert into penerbit_majalah set = ?`, (err, result) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    //mengupdate data pada tabel penerbit majalah berdasarkan id
    static async update(data, id) {
        return new Promise((resolve, reject) => [
            connection.querry(`udpate penrtbit_majalah set = ? where id = ?`, [data, id], (err, result) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        ]) 
    }

    //menghapus data pada tabel penerbit majalah berdasarkan id
    static async delete(id) {
        return new Promise((resolve, reject) => {
            connection.querry(`delete penerbit_majalah where id = ?`, id, (err, result) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }
}

module.exports = modelpenerbitMajalah