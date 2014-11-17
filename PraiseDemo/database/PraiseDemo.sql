/*
 Navicat MySQL Data Transfer 

 Source Server         : MySQL
 Source Server Type    : MySQL
 Source Server Version : 50619
 Source Host           : localhost
 Source Database       : bookshelfTest

 Target Server Type    : MySQL
 Target Server Version : 50619
 File Encoding         : utf-8

 Date: 11/17/2014 17:44:17 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `post_star`
-- ----------------------------
DROP TABLE IF EXISTS `post_star`;
CREATE TABLE `post_star` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `postID` int(11) NOT NULL,
  `star` int(11) NOT NULL DEFAULT '0',
  `hate` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `post-index` (`postID`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `star_logs`
-- ----------------------------
DROP TABLE IF EXISTS `star_logs`;
CREATE TABLE `star_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `postID` int(11) NOT NULL,
  `userID` int(11) DEFAULT NULL,
  `time` datetime NOT NULL,
  `type` varchar(11) NOT NULL,
  `behavior` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
