CREATE DATABASE  IF NOT EXISTS `qpee` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `qpee`;
-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 192.168.0.159    Database: qpee
-- ------------------------------------------------------
-- Server version 5.7.21-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `userID` varchar(100) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subjects` (
  `subjectsID` int(100) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(100) NOT NULL,
  `userID` varchar(100) NOT NULL,
  PRIMARY KEY (`subjectsID`),
  KEY `userID` (`userID`),
  CONSTRAINT `subjects_ibfk_1_idx` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`)  ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

--
-- Table structure for table `collections`
--

DROP TABLE IF EXISTS `collections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `collections` (
  `collectionsID` int(100) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `subjectsID` int(100) NOT NULL,
  PRIMARY KEY (`collectionsID`),
  KEY `subjectsID` (`subjectsID`),
  CONSTRAINT `collections_ibfk_1_idx` FOREIGN KEY (`subjectsID`) REFERENCES `subjects` (`subjectsID`)  ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

--
-- Table structure for table `request`
--

DROP TABLE IF EXISTS `request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `request` (
  `requestID` int(100) NOT NULL AUTO_INCREMENT,
  `url` varchar(500) NOT NULL,
  `method` varchar(100) NOT NULL,
  `raw` varchar(100) NOT NULL,
  `payload` varchar(500) NOT NULL,
  `collectionsID` int(100) NOT NULL,
  PRIMARY KEY (`requestID`),
  KEY `collectionsID` (`collectionsID`),
  CONSTRAINT `request_ibfk_1_idx` FOREIGN KEY (`collectionsID`) REFERENCES `collections` (`collectionsID`)  ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

--
-- Table structure for table `requestConditions`
--

DROP TABLE IF EXISTS `requestConditions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `requestConditions` (
  `requestConditionsID` int(100) NOT NULL AUTO_INCREMENT,
  `description` varchar(100) NOT NULL,
  `keySubject` varchar(100) NOT NULL,
  `keyCondition` varchar(2) NOT NULL,
  `value` varchar(100) NOT NULL,
  `requestID` int(100) NOT NULL,
  PRIMARY KEY (`requestConditionsID`),
  KEY `requestID` (`requestID`),
  CONSTRAINT `requestConditions_ibfk_1_idx` FOREIGN KEY (`requestID`) REFERENCES `request` (`requestID`)  ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

--
-- Table structure for table `activity`
--

DROP TABLE IF EXISTS `activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `activity` (
  `activityID` int(100) NOT NULL AUTO_INCREMENT,
  `count` int(100) NOT NULL,
  `requestID` int(100) NOT NULL,
  PRIMARY KEY (`activityID`),
  KEY `requestID` (`requestID`),
  CONSTRAINT `activity_ibfk_1_idx` FOREIGN KEY (`requestID`) REFERENCES `request` (`requestID`)  ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

--
-- Table structure for table `statusList`
--

DROP TABLE IF EXISTS `statusList`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `statusList` (
  `statusListID` int(100) NOT NULL AUTO_INCREMENT,
  `description` varchar(100) NOT NULL,
  `information` varchar(200) NOT NULL,
  PRIMARY KEY (`statusListID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

--
-- Table structure for table `results`
--

DROP TABLE IF EXISTS `results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `results` (
  `resultsID` int(100) NOT NULL AUTO_INCREMENT,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `statusListID` int(100) NOT NULL,
  `requestConditionsID` int(100) NOT NULL,
  PRIMARY KEY (`resultsID`),
  KEY `statusListID` (`statusListID`),
  CONSTRAINT `results_ibfk_1_idx` FOREIGN KEY (`statusListID`) REFERENCES `statusList` (`statusListID`)  ON DELETE CASCADE ON UPDATE NO ACTION,
  KEY `requestConditionsID` (`requestConditionsID`),
  CONSTRAINT `results_ibfk_2_idx` FOREIGN KEY (`requestConditionsID`) REFERENCES `requestConditions` (`requestConditionsID`)  ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

--
-- Table structure for table `execution`
--

DROP TABLE IF EXISTS `execution`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `execution` (
  `executionID` int(100) NOT NULL AUTO_INCREMENT,
  `executionTime` timestamp NOT NULL,
  `executionAt` timestamp NOT NULL,
  `requestID` int(100) NOT NULL,
  `statusListID` int(100) NOT NULL,
  `activityID` int(100) NOT NULL,
  PRIMARY KEY (`executionID`),
  KEY `requestID` (`requestID`),
  CONSTRAINT `execution_ibfk_1_idx` FOREIGN KEY (`requestID`) REFERENCES `request` (`requestID`)  ON DELETE CASCADE ON UPDATE NO ACTION,
  KEY `statusListID` (`statusListID`),
  CONSTRAINT `execution_ibfk_2_idx` FOREIGN KEY (`statusListID`) REFERENCES `statusList` (`statusListID`)  ON DELETE CASCADE ON UPDATE NO ACTION,
  KEY `activityID` (`activityID`),
  CONSTRAINT `execution_ibfk_3_idx` FOREIGN KEY (`activityID`) REFERENCES `activity` (`activityID`)  ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-09 11:30:51

