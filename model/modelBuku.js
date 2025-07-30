const connection = require('../config/database')

class modelBuku {
    static async getBukuDanMajalh(keyword) {
        return new Promise((resolve, reject) => {
            connection.querry(`SELECT b.id, b.judul_buku AS judul, b.no_klasifikasi_buku AS no_klasifikasi, CONCAT(l.kode_lantai, ' - ', ru.kode_ruangan, ' - ', rk.kode_rak) AS lokasi, 'buku' AS jenis FROM buku b JOIN rak rk ON b.id_rak = rk.id JOIN ruangan ru ON rk.id_ruangan = ru.id JOIN lantai l ON ru.id_lantai = l.id WHERE b.status = 'Tampil' AND b.judul_buku LIKE CONCAT('%', ?, '%') UNION SELECT m.id, CONCAT(m.judul_majalah, ' (Edisi: ', m.edisi, ')') AS judul, m.no_klasifikasi_majalah AS no_klasifikasi, CONCAT(l.kode_lantai, ' - ', ru.kode_ruangan, ' - ', rk.kode_rak) AS lokasi, 'majalah' AS jenis FROM majalah m JOIN rak rk ON m.id_rak = rk.id JOIN ruangan ru ON rk.id_ruangan = ru.id JOIN lantai l ON ru.id_lantai = l.id WHERE m.status = 'Tampil' AND (m.judul_majalah LIKE CONCAT('%', ?, '%') OR m.edisi LIKE CONCAT('%', ?, '%'));`, [keyword, keyword, keyword], (err, rows) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }

    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT b.id, b.judul_buku, b.tahun_terbit_buku, b.ketersediaan, GROUP_CONCAT(DISTINCT pb.nama_pengarang SEPARATOR ', ') AS pengarang, GROUP_CONCAT(DISTINCT kb.nama_kategori SEPARATOR ', ') AS kategori FROM buku b LEFT JOIN pengarang_buku pb ON b.id = pb.id_buku LEFT JOIN kategori_buku kb ON b.id = kb.id_buku WHERE b.status = 'Tampil' GROUP BY b.id;`, (err, rows) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }

    static async store(data) {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO buku SET ?`, data, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

}

module.exports = modelBuku