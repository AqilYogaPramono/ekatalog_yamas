-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Waktu pembuatan: 14 Okt 2025 pada 07.16
-- Versi server: 8.0.30
-- Versi PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_ekatalog_yamas`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `buku`
--

CREATE TABLE `buku` (
  `id` int NOT NULL,
  `judul` varchar(255) DEFAULT NULL,
  `foto_cover` varchar(255) DEFAULT NULL,
  `isbn_issn` varchar(255) DEFAULT NULL,
  `no_klasifikasi` varchar(255) DEFAULT NULL,
  `bahasa` varchar(255) DEFAULT NULL,
  `jumlah_halaman` int DEFAULT NULL,
  `tahun_terbit` year DEFAULT NULL,
  `sinopsis` text,
  `tempat_terbit` varchar(255) DEFAULT NULL,
  `penerbit` varchar(255) DEFAULT NULL,
  `kategori` varchar(255) DEFAULT NULL,
  `pengarang` varchar(255) DEFAULT NULL,
  `id_rak` int DEFAULT NULL,
  `ketersediaan` enum('Tersedia','Tidak Tersedia') NOT NULL DEFAULT 'Tersedia',
  `dibuat_pada` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `diubah_pada` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `dihapus_pada` datetime DEFAULT NULL,
  `dibuat_oleh` int NOT NULL,
  `diubah_oleh` int DEFAULT NULL,
  `dihapus_oleh` int DEFAULT NULL,
  `status_data` enum('Tampil','Hapus') NOT NULL DEFAULT 'Tampil'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `koran`
--

CREATE TABLE `koran` (
  `id` int NOT NULL,
  `id_nama_koran` int DEFAULT NULL,
  `tahun` varchar(4) DEFAULT NULL,
  `bulan` enum('Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember') DEFAULT NULL,
  `ketersediaan` enum('Tersedia','Tidak Tersedia') NOT NULL DEFAULT 'Tersedia',
  `dibuat_pada` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `diubah_pada` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `dihapus_pada` datetime DEFAULT NULL,
  `dibuat_oleh` int NOT NULL,
  `diubah_oleh` int DEFAULT NULL,
  `dihapus_oleh` int DEFAULT NULL,
  `status_data` enum('Tampil','Hapus') NOT NULL DEFAULT 'Tampil'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `lantai`
--

CREATE TABLE `lantai` (
  `id` int NOT NULL,
  `kode_lantai` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `majalah`
--

CREATE TABLE `majalah` (
  `id` int NOT NULL,
  `judul` varchar(255) DEFAULT NULL,
  `foto_cover` varchar(255) DEFAULT NULL,
  `edisi` varchar(255) DEFAULT NULL,
  `no_klasifikasi` varchar(255) DEFAULT NULL,
  `bahasa` varchar(255) DEFAULT NULL,
  `tahun_terbit` year DEFAULT NULL,
  `sinopsis` text,
  `tempat_terbit` varchar(255) DEFAULT NULL,
  `penerbit` varchar(255) DEFAULT NULL,
  `id_rak` int DEFAULT NULL,
  `ketersediaan` enum('Tersedia','Tidak Tersedia') NOT NULL DEFAULT 'Tersedia',
  `dibuat_pada` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `diubah_pada` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `dihapus_pada` datetime DEFAULT NULL,
  `dibuat_oleh` int NOT NULL,
  `diubah_oleh` int DEFAULT NULL,
  `dihapus_oleh` int DEFAULT NULL,
  `status_data` enum('Tampil','Hapus') NOT NULL DEFAULT 'Tampil'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `nama_koran`
--

CREATE TABLE `nama_koran` (
  `id` int NOT NULL,
  `nama_koran` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `pengguna`
--

CREATE TABLE `pengguna` (
  `id` int NOT NULL,
  `nama` varchar(255) NOT NULL,
  `NP` varchar(255) NOT NULL,
  `kata_sandi` varchar(255) NOT NULL,
  `peran` enum('Pustakawan','Manajer') NOT NULL,
  `status_akun` enum('Aktif','Non-Aktif','Proses') NOT NULL DEFAULT 'Proses'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `rak`
--

CREATE TABLE `rak` (
  `id` int NOT NULL,
  `id_ruangan` int DEFAULT NULL,
  `kode_rak` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `ruangan`
--

CREATE TABLE `ruangan` (
  `id` int NOT NULL,
  `id_lantai` int DEFAULT NULL,
  `kode_ruangan` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `buku`
--
ALTER TABLE `buku`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `foto_cover` (`foto_cover`),
  ADD UNIQUE KEY `isbn_issn` (`isbn_issn`),
  ADD UNIQUE KEY `no_klasifikasi` (`no_klasifikasi`),
  ADD KEY `id_rak` (`id_rak`);

--
-- Indeks untuk tabel `koran`
--
ALTER TABLE `koran`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `lantai`
--
ALTER TABLE `lantai`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kode_lantai` (`kode_lantai`);

--
-- Indeks untuk tabel `majalah`
--
ALTER TABLE `majalah`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `foto_cover` (`foto_cover`),
  ADD UNIQUE KEY `no_klasifikasi` (`no_klasifikasi`);

--
-- Indeks untuk tabel `nama_koran`
--
ALTER TABLE `nama_koran`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nama_koran` (`nama_koran`);

--
-- Indeks untuk tabel `pengguna`
--
ALTER TABLE `pengguna`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `NP` (`NP`);

--
-- Indeks untuk tabel `rak`
--
ALTER TABLE `rak`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kode_rak` (`kode_rak`),
  ADD KEY `id_ruangan` (`id_ruangan`);

--
-- Indeks untuk tabel `ruangan`
--
ALTER TABLE `ruangan`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kode_ruangan` (`kode_ruangan`),
  ADD KEY `id_lantai` (`id_lantai`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `buku`
--
ALTER TABLE `buku`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `koran`
--
ALTER TABLE `koran`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `lantai`
--
ALTER TABLE `lantai`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `majalah`
--
ALTER TABLE `majalah`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `nama_koran`
--
ALTER TABLE `nama_koran`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `pengguna`
--
ALTER TABLE `pengguna`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `rak`
--
ALTER TABLE `rak`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `ruangan`
--
ALTER TABLE `ruangan`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `buku`
--
ALTER TABLE `buku`
  ADD CONSTRAINT `buku_ibfk_1` FOREIGN KEY (`id_rak`) REFERENCES `rak` (`id`) ON DELETE SET NULL;

--
-- Ketidakleluasaan untuk tabel `rak`
--
ALTER TABLE `rak`
  ADD CONSTRAINT `rak_ibfk_1` FOREIGN KEY (`id_ruangan`) REFERENCES `ruangan` (`id`) ON DELETE SET NULL;

--
-- Ketidakleluasaan untuk tabel `ruangan`
--
ALTER TABLE `ruangan`
  ADD CONSTRAINT `ruangan_ibfk_1` FOREIGN KEY (`id_lantai`) REFERENCES `lantai` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
