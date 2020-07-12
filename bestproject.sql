-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 12, 2020 at 06:21 PM
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
  `b_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `publish` varchar(25) NOT NULL,
  `genres` varchar(10) NOT NULL,
  `author` varchar(60) NOT NULL,
  `image` varchar(100) NOT NULL,
  `price` int(11) NOT NULL DEFAULT '1000'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`b_id`, `name`, `publish`, `genres`, `author`, `image`, `price`) VALUES
(2, 'boruto', 'shonen', 'comedy', 'kishimoto', 'undefined', 2000),
(5, 'tower of god', 'rolls', 'mystery', 'sui', 'undefined', 1500),
(6, 'tower', 'nytimes', 'horror', 'stephen ki', '', 1000),
(8, 'naruto', 'shonen', 'horror', 'kishimoto', '', 3000);

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `c_id` int(11) NOT NULL,
  `b_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT '0',
  `total` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`c_id`, `b_id`, `quantity`, `total`) VALUES
(2, 2, 2, 4000),
(2, 5, 2, 3000),
(4, 2, 3, 6000),
(4, 5, 1, 1500);

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
(2, 'nick', 'niigi', 'nivchauhan99@gmail.com', 'surat', '8758489996'),
(3, 'nirav', 'niigi', '', '', '0'),
(4, 'meet', '1234', 'meet@gmail.com', 'adajan,surat', '9979559895');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`b_id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`c_id`,`b_id`);

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
-- AUTO_INCREMENT for table `book`
--
ALTER TABLE `book`
  MODIFY `b_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `userb`
--
ALTER TABLE `userb`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
