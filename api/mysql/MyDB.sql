
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";



CREATE DATABASE IF NOT EXISTS `mydatabase` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `mydatabase`;

-- # TABLE STRUCTURE FOR: Carousel


DROP TABLE IF EXISTS `Carousel`;

CREATE TABLE `Carousel` (
  `id` int(9) unsigned NOT NULL AUTO_INCREMENT,
  `Image` set('item1','item2','item3','item4') NOT NULL,
  `text1` varchar(255) NOT NULL,
  `text2` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- # TABLE STRUCTURE FOR: newletters


DROP TABLE IF EXISTS `newletters`;

CREATE TABLE `newletters` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Email` varchar(100) NOT NULL,
  UNIQUE KEY `id` (`id`),
  KEY `Email` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

