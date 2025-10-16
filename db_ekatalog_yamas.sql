-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 15, 2025 at 05:40 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

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
-- Table structure for table `buku`
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
  `dibuat_oleh` varchar(255) NOT NULL,
  `diubah_oleh` varchar(255) DEFAULT NULL,
  `dihapus_oleh` varchar(255) DEFAULT NULL,
  `status_data` enum('Tampil','Hapus') NOT NULL DEFAULT 'Tampil'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `koran`
--

CREATE TABLE `koran` (
  `id` int NOT NULL,
  `id_penerbit_koran` int DEFAULT NULL,
  `tahun` varchar(4) DEFAULT NULL,
  `bulan` enum('Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember') DEFAULT NULL,
  `ketersediaan` enum('Tersedia','Tidak Tersedia') NOT NULL DEFAULT 'Tersedia',
  `dibuat_pada` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `diubah_pada` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `dihapus_pada` datetime DEFAULT NULL,
  `dibuat_oleh` varchar(255) NOT NULL,
  `diubah_oleh` varchar(255) DEFAULT NULL,
  `dihapus_oleh` varchar(255) DEFAULT NULL,
  `status_data` enum('Tampil','Hapus') NOT NULL DEFAULT 'Tampil'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lantai`
--

CREATE TABLE `lantai` (
  `id` int NOT NULL,
  `kode_lantai` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `majalah`
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
  `dibuat_oleh` varchar(255) NOT NULL,
  `diubah_oleh` varchar(255) DEFAULT NULL,
  `dihapus_oleh` varchar(255) DEFAULT NULL,
  `status_data` enum('Tampil','Hapus') NOT NULL DEFAULT 'Tampil'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `penerbit_koran`
--

CREATE TABLE `penerbit_koran` (
  `id` int NOT NULL,
  `nama_penerbit` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pengguna`
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
-- Table structure for table `rak`
--

CREATE TABLE `rak` (
  `id` int NOT NULL,
  `id_ruangan` int DEFAULT NULL,
  `kode_rak` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ruangan`
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
-- Indexes for table `buku`
--
ALTER TABLE `buku`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `foto_cover` (`foto_cover`),
  ADD UNIQUE KEY `isbn_issn` (`isbn_issn`),
  ADD UNIQUE KEY `no_klasifikasi` (`no_klasifikasi`),
  ADD KEY `id_rak` (`id_rak`);

--
-- Indexes for table `koran`
--
ALTER TABLE `koran`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_penerbit_koran` (`id_penerbit_koran`);

--
-- Indexes for table `lantai`
--
ALTER TABLE `lantai`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kode_lantai` (`kode_lantai`);

--
-- Indexes for table `majalah`
--
ALTER TABLE `majalah`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `foto_cover` (`foto_cover`),
  ADD UNIQUE KEY `no_klasifikasi` (`no_klasifikasi`),
  ADD KEY `id_rak` (`id_rak`);

--
-- Indexes for table `penerbit_koran`
--
ALTER TABLE `penerbit_koran`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nama_penerbit` (`nama_penerbit`);

--
-- Indexes for table `pengguna`
--
ALTER TABLE `pengguna`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `NP` (`NP`);

--
-- Indexes for table `rak`
--
ALTER TABLE `rak`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kode_rak` (`kode_rak`),
  ADD KEY `id_ruangan` (`id_ruangan`);

--
-- Indexes for table `ruangan`
--
ALTER TABLE `ruangan`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kode_ruangan` (`kode_ruangan`),
  ADD KEY `id_lantai` (`id_lantai`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `buku`
--
ALTER TABLE `buku`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `koran`
--
ALTER TABLE `koran`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lantai`
--
ALTER TABLE `lantai`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `majalah`
--
ALTER TABLE `majalah`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `penerbit_koran`
--
ALTER TABLE `penerbit_koran`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pengguna`
--
ALTER TABLE `pengguna`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rak`
--
ALTER TABLE `rak`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ruangan`
--
ALTER TABLE `ruangan`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `buku`
--
ALTER TABLE `buku`
  ADD CONSTRAINT `buku_ibfk_1` FOREIGN KEY (`id_rak`) REFERENCES `rak` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `koran`
--
ALTER TABLE `koran`
  ADD CONSTRAINT `koran_ibfk_1` FOREIGN KEY (`id_penerbit_koran`) REFERENCES `penerbit_koran` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `majalah`
--
ALTER TABLE `majalah`
  ADD CONSTRAINT `majalah_ibfk_1` FOREIGN KEY (`id_rak`) REFERENCES `rak` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `rak`
--
ALTER TABLE `rak`
  ADD CONSTRAINT `rak_ibfk_1` FOREIGN KEY (`id_ruangan`) REFERENCES `ruangan` (`id`);

--
-- Constraints for table `ruangan`
--
ALTER TABLE `ruangan`
  ADD CONSTRAINT `ruangan_ibfk_1` FOREIGN KEY (`id_lantai`) REFERENCES `lantai` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
