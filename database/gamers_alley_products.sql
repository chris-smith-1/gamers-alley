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
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `description` varchar(500) NOT NULL,
  `price` decimal(5,2) DEFAULT NULL,
  `image_1` varchar(100) DEFAULT NULL,
  `image_2` varchar(100) DEFAULT NULL,
  `image_3` varchar(100) DEFAULT NULL,
  `image_4` varchar(100) DEFAULT NULL,
  `image_5` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Exploding Kittens','card-games','Exploding kittens is a card game for people who are into kittens and explosions and laser beams and sometimes goats. In this highly-strategic, kitty-powered version of Russian roulette, players draw cards until someone draws an exploding kitten, at which point They explode, they are Dead, and they are out of the game.',19.99,'images/exploding-kittens.jpeg','###','###','###','###'),(2,'Love Letter','card-games','In love letter, players compete to have their letters delivered to the princess to prove their worth. In a quick game of risk and deduction, can you outwit your friends and earn the trust of the noble princess?',11.99,'images/love-letter.jpg','###','###','###','###'),(3,'One Night Ultimate Werewolf','role-playing-games','One Night Ultimate Werewolf is a fast paced game where everyone gets to be a different role. In the course of only one night and the following morning, the players will determine who among them is a werewolf...hopefully. One Night Ultimate Werewolf is a micro game of the party game Ultimate Werewolf that doesn\'t need a moderator.',11.09,'images/one-night-werewolf.webp','###','###','###','###'),(4,'Zombicide','role-playing-games','GO MEDIEVAL ON SOME ZOMBIES! During the Middle Ages, a mysterious illness is sweeping across the countryside, turning anyone it touches into mindless, bloodthirsty walkers. Only the brave and strong can survive this Black Plague. Zombicide: Black Plague is a cooperative adventure, pitting a plucky band of Survivors against hordes of zombies controlled by evil Necromancers, intent on adding them to their midst.',71.40,'images/zombicide.jpg','###','###','###','###'),(5,'Catan','board-games','Your adventurous settlers seek to tame the remote but rich isle of Catan. Start by revealing Catan’s many harbors and regions: pastures, fields, mountains, hills, forests, and desert. The random mix creates a different board virtually every game. Skills - Clever trading, strategy, tactical skill, luck.',35.99,'images/catan.jpeg','###','###','###','###'),(6,'Dominion: Nocturne','card-games','Dominion: Nocturne, the 11th expansion to Dominion, has 500 cards, with 33 new Kingdom cards. There are night cards, which are played after the buy phase; heirlooms that replace starting coppers; fate and doom cards that give out boons and hexes; and a variety of extra cards that other cards can provide.',36.43,'images/dominion-nocturne.jpg','###','###','###','###');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-28 14:02:57
