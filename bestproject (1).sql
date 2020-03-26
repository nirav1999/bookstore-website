-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 15, 2020 at 11:03 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bestproject`
--

-- --------------------------------------------------------

--
-- Table structure for table `1`
--

CREATE TABLE `1` (
  `name` varchar(50) DEFAULT NULL,
  `price` int(6) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `total` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `2`
--

CREATE TABLE `2` (
  `name` varchar(50) NOT NULL,
  `price` int(6) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `total` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `2`
--

INSERT INTO `2` (`name`, `price`, `quantity`, `total`) VALUES
('ignited minds', 1000, 4, 4000);

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `name` varchar(10) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`name`, `password`) VALUES
('nirav', '1234');

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

CREATE TABLE `book` (
  `name` varchar(50) NOT NULL,
  `publish` varchar(10) NOT NULL,
  `genres` varchar(10) NOT NULL,
  `author` varchar(10) NOT NULL,
  `image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`name`, `publish`, `genres`, `author`, `image`) VALUES
('a', 'b', 'c', 'd', ''),
('d', 'r', 's', 'd', ''),
('s', 'd', 'f', 'g', '');

-- --------------------------------------------------------

--
-- Table structure for table `userb`
--

CREATE TABLE `userb` (
  `userid` int(11) NOT NULL,
  `name` varchar(15) NOT NULL,
  `password` varchar(15) DEFAULT NULL,
  `email` varchar(80) NOT NULL,
  `address` varchar(100) DEFAULT NULL,
  `mobno` decimal(18,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userb`
--

INSERT INTO `userb` (`userid`, `name`, `password`, `email`, `address`, `mobno`) VALUES
(1, 'nirav', 'niigi', 'nivchauhan@gmail.com', 'surat', '8758489996'),
(2, 'nick', 'niigi', 'nivchauhan99@gmail.com', 'surat', '8758489996');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `2`
--
ALTER TABLE `2`
  ADD PRIMARY KEY (`name`);

--
-- Indexes for table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`name`);

--
-- Indexes for table `userb`
--
ALTER TABLE `userb`
  ADD PRIMARY KEY (`userid`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `userb`
--
ALTER TABLE `userb`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
