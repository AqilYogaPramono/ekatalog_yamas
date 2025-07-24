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
}

module.exports = modelBuku