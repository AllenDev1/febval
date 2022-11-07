#
# TABLE STRUCTURE FOR: Carousel
#

DROP TABLE IF EXISTS `Carousel`;

CREATE TABLE `Carousel` (
  `id` int(9) unsigned NOT NULL AUTO_INCREMENT,
  `carousel_image` varchar(255) NOT NULL,
  `time` time DEFAULT NULL,
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: Product_table
#

DROP TABLE IF EXISTS `Product_table`;

CREATE TABLE `Product_table` (
  `id` int(9) unsigned NOT NULL AUTO_INCREMENT,
  `Product_name` varchar(100) NOT NULL,
  `Product_desc` text NOT NULL,
  `product_Category` varchar(255) NOT NULL,
  `Discount_price` float(10,4) NOT NULL,
  `Selling_Price` float(10,4) NOT NULL,
  `Created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `Modified_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `active` varchar(255) NOT NULL,
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: User_table
#

DROP TABLE IF EXISTS `User_table`;

CREATE TABLE `User_table` (
  `id` int(9) unsigned NOT NULL AUTO_INCREMENT,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `First_name` varchar(255) NOT NULL,
  `Last_name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` bit(15) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_at` timestamp NOT NULL DEFAULT current_timestamp(),
  KEY `id` (`id`),
  KEY `Email` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: sales_banner
#

DROP TABLE IF EXISTS `sales_banner`;

CREATE TABLE `sales_banner` (
  `id` int(9) unsigned NOT NULL AUTO_INCREMENT,
  `sales_image` varchar(255) NOT NULL,
  `time` time DEFAULT NULL,
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: user_address
#

DROP TABLE IF EXISTS `user_address`;

CREATE TABLE `user_address` (
  `id` int(9) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(9) unsigned NOT NULL,
  `address1` varchar(255) NOT NULL,
  `address2` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# TABLE STRUCTURE FOR: user_payment
#

DROP TABLE IF EXISTS `user_payment`;

CREATE TABLE `user_payment` (
  `id` int(9) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(9) unsigned NOT NULL,
  `payment_type` varchar(255) NOT NULL,
  `Provider` varchar(255) NOT NULL,
  `account_no` varchar(255) NOT NULL,
  `expiry` datetime NOT NULL,
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

