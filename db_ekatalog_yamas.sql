-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 19, 2025 at 04:46 AM
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
-- Table structure for table `bahasa`
--

CREATE TABLE `bahasa` (
  `id` int NOT NULL,
  `bahasa` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `buku`
--

CREATE TABLE `buku` (
  `id` int NOT NULL,
  `judul_buku` varchar(255) DEFAULT NULL,
  `foto_cover_buku` varchar(255) DEFAULT NULL,
  `isbn_issn` varchar(255) DEFAULT NULL,
  `no_klasifikasi_buku` varchar(255) DEFAULT NULL,
  `id_nama_pengarang_buku` int DEFAULT NULL,
  `id_bahasa` int DEFAULT NULL,
  `total_halaman_buku` int DEFAULT NULL,
  `tahun_terbit_buku` year DEFAULT NULL,
  `ketersediaan_buku` enum('ada','tidak ada') DEFAULT NULL,
  `sinopsis_buku` text,
  `id_tempat_terbit_buku` int DEFAULT NULL,
  `id_penerbit_buku` int DEFAULT NULL,
  `id_rak` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kategori_buku`
--

CREATE TABLE `kategori_buku` (
  `id` int NOT NULL,
  `id_buku` int DEFAULT NULL,
  `nama_kategori` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lantai`
--

CREATE TABLE `lantai` (
  `id` int NOT NULL,
  `kode_lantai` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `majalah`
--

CREATE TABLE `majalah` (
  `id` int NOT NULL,
  `judul_majalah` varchar(255) DEFAULT NULL,
  `foto_cover` varchar(255) DEFAULT NULL,
  `edisi` varchar(255) DEFAULT NULL,
  `no_klasifikasi_majalah` varchar(255) DEFAULT NULL,
  `id_bahasa` int DEFAULT NULL,
  `id_penerbit_majalah` int DEFAULT NULL,
  `tahun_terbit` year DEFAULT NULL,
  `id_tempat_terbit_majalah` int DEFAULT NULL,
  `sinopsis` text,
  `ketersediaan` enum('tersedia','tidak tersedia') DEFAULT NULL,
  `id_rak` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `nama_pengarang_buku`
--

CREATE TABLE `nama_pengarang_buku` (
  `id` int NOT NULL,
  `id_buku` int DEFAULT NULL,
  `nama_pengarang` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `penerbit_buku`
--

CREATE TABLE `penerbit_buku` (
  `id` int NOT NULL,
  `nama_penerbit` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `penerbit_majalah`
--

CREATE TABLE `penerbit_majalah` (
  `id` int NOT NULL,
  `nama_penerbit` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pengurus`
--

CREATE TABLE `pengurus` (
  `id` int NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `level_pengurus` enum('admin','pengurus') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rak`
--

CREATE TABLE `rak` (
  `id` int NOT NULL,
  `id_ruangan` int DEFAULT NULL,
  `kode_rak` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ruangan`
--

CREATE TABLE `ruangan` (
  `id` int NOT NULL,
  `id_lantai` int DEFAULT NULL,
  `kode_ruangan` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tempat_terbit_buku`
--

CREATE TABLE `tempat_terbit_buku` (
  `id` int NOT NULL,
  `nama_tempat_terbit` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tempat_terbit_majalah`
--

CREATE TABLE `tempat_terbit_majalah` (
  `id` int NOT NULL,
  `nama_tempat_terbit` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bahasa`
--
ALTER TABLE `bahasa`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `buku`
--
ALTER TABLE `buku`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `foto_cover_buku` (`foto_cover_buku`),
  ADD KEY `id_bahasa` (`id_bahasa`),
  ADD KEY `id_tempat_terbit_buku` (`id_tempat_terbit_buku`),
  ADD KEY `id_penerbit_buku` (`id_penerbit_buku`),
  ADD KEY `id_rak` (`id_rak`);

--
-- Indexes for table `kategori_buku`
--
ALTER TABLE `kategori_buku`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lantai`
--
ALTER TABLE `lantai`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `majalah`
--
ALTER TABLE `majalah`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `foto_cover` (`foto_cover`),
  ADD UNIQUE KEY `no_klasifikasi_majalah` (`no_klasifikasi_majalah`),
  ADD KEY `id_bahasa` (`id_bahasa`),
  ADD KEY `id_penerbit_majalah` (`id_penerbit_majalah`),
  ADD KEY `id_tempat_terbit_majalah` (`id_tempat_terbit_majalah`),
  ADD KEY `id_rak` (`id_rak`);

--
-- Indexes for table `nama_pengarang_buku`
--
ALTER TABLE `nama_pengarang_buku`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `penerbit_buku`
--
ALTER TABLE `penerbit_buku`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `penerbit_majalah`
--
ALTER TABLE `penerbit_majalah`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pengurus`
--
ALTER TABLE `pengurus`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `rak`
--
ALTER TABLE `rak`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_ruangan` (`id_ruangan`);

--
-- Indexes for table `ruangan`
--
ALTER TABLE `ruangan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_lantai` (`id_lantai`);

--
-- Indexes for table `tempat_terbit_buku`
--
ALTER TABLE `tempat_terbit_buku`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tempat_terbit_majalah`
--
ALTER TABLE `tempat_terbit_majalah`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bahasa`
--
ALTER TABLE `bahasa`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `buku`
--
ALTER TABLE `buku`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kategori_buku`
--
ALTER TABLE `kategori_buku`
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
-- AUTO_INCREMENT for table `nama_pengarang_buku`
--
ALTER TABLE `nama_pengarang_buku`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `penerbit_buku`
--
ALTER TABLE `penerbit_buku`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `penerbit_majalah`
--
ALTER TABLE `penerbit_majalah`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pengurus`
--
ALTER TABLE `pengurus`
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
-- AUTO_INCREMENT for table `tempat_terbit_buku`
--
ALTER TABLE `tempat_terbit_buku`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tempat_terbit_majalah`
--
ALTER TABLE `tempat_terbit_majalah`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `buku`
--
ALTER TABLE `buku`
  ADD CONSTRAINT `buku_ibfk_1` FOREIGN KEY (`id_bahasa`) REFERENCES `bahasa` (`id`),
  ADD CONSTRAINT `buku_ibfk_2` FOREIGN KEY (`id_tempat_terbit_buku`) REFERENCES `tempat_terbit_buku` (`id`),
  ADD CONSTRAINT `buku_ibfk_3` FOREIGN KEY (`id_penerbit_buku`) REFERENCES `penerbit_buku` (`id`),
  ADD CONSTRAINT `buku_ibfk_4` FOREIGN KEY (`id_rak`) REFERENCES `rak` (`id`);

--
-- Constraints for table `majalah`
--
ALTER TABLE `majalah`
  ADD CONSTRAINT `majalah_ibfk_1` FOREIGN KEY (`id_bahasa`) REFERENCES `bahasa` (`id`),
  ADD CONSTRAINT `majalah_ibfk_2` FOREIGN KEY (`id_penerbit_majalah`) REFERENCES `penerbit_majalah` (`id`),
  ADD CONSTRAINT `majalah_ibfk_3` FOREIGN KEY (`id_tempat_terbit_majalah`) REFERENCES `tempat_terbit_majalah` (`id`),
  ADD CONSTRAINT `majalah_ibfk_4` FOREIGN KEY (`id_rak`) REFERENCES `rak` (`id`);

--
-- Constraints for table `rak`
--
ALTER TABLE `rak`
  ADD CONSTRAINT `rak_ibfk_1` FOREIGN KEY (`id_ruangan`) REFERENCES `ruangan` (`id`);

--
-- Constraints for table `ruangan`
--
ALTER TABLE `ruangan`
  ADD CONSTRAINT `ruangan_ibfk_1` FOREIGN KEY (`id_lantai`) REFERENCES `ruangan` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
