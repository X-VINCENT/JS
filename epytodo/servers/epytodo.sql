DROP DATABASE IF EXISTS `epytodo`;
CREATE DATABASE `epytodo`;
USE `epytodo`;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id`          int UNSIGNED NOT NULL AUTO_INCREMENT,
  `email`       VARCHAR(255) NOT NULL,
  `password`    VARCHAR(255) NOT NULL,
  `created_at`  timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name`        VARCHAR(255) NOT NULL,
  `firstname`   VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `todo`;
CREATE TABLE `todo` (
  `id`          int unsigned NOT NULL AUTO_INCREMENT,
  `title`       VARCHAR(255) NOT NULL,
  `description` text         NOT NULL,
  `created_at`  timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `due_time`    timestamp    NOT NULL,
  `status` ENUM('not started', 'todo', 'in progress', 'done') NOT NULL DEFAULT 'not started',
  `user_id`     int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `todo_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
