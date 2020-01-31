-- MySQL dump 10.13  Distrib 8.0.18, for macos10.14 (x86_64)
--
-- Host: localhost    Database: gamers_alley
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image_id` int(11) NOT NULL,
  `image_1` varchar(50) DEFAULT NULL,
  `image_2` varchar(50) DEFAULT NULL,
  `image_3` varchar(50) DEFAULT NULL,
  `image_4` varchar(50) DEFAULT NULL,
  `image_5` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `image_id` (`image_id`),
  CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`image_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (1,1,'images/exploding-kittens.jpeg','images/exploding-kittens-2.jpeg','images/exploding-kittens-3.jpg','images/exploding-kittens-4.jpg','images/exploding-kittens-5.png'),(2,2,'images/love-letter.jpg','images/love-letter-2.jpg','images/love-letter-3.webp','images/love-letter-4.jpg','images/love-letter-5.jpg'),(3,3,'images/one-night-werewolf.webp','images/one-night-werewolf-2.webp','images/one-night-werewolf-3.png','images/one-night-werewolf-4.jpg','images/one-night-werewolf-5.jpg'),(4,5,'images/catan.jpeg','images/catan-2.jpg','images/catan-3.jpg','images/catan-4.jpg','images/catan-5.jpg'),(5,4,'images/zombicide.jpg','images/zombicide-2.jpg','images/zombicide-3.jpg','images/zombicide-4.png','images/zombicide-5.jpg'),(6,6,'images/dominion-nocturne.jpg','images/dominion-nocturne-2.jpg','images/dominion-nocturne-3.jpg','images/dominion-nocturne-4.jpg','images/dominion-nocturne-5.jpg');
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-31  9:19:02
