CREATE DATABASE miniProject;
USE miniProject;

CREATE TABLE rivers (
	`river_id` VARCHAR(10) PRIMARY KEY,
    `name` VARCHAR(30) NOT NULL,
    `level_of_pollution` ENUM("1", "2", "3", "4", "5"),
    `source` VARCHAR(30),
    `destination` VARCHAR(30)
);

CREATE TABLE states (
	`name` VARCHAR(30) PRIMARY KEY,
    `region` VARCHAR(30) NOT NULL
);

CREATE TABLE lakes (
	`lake_id` VARCHAR(10) PRIMARY KEY,
    `name` VARCHAR(30) NOT NULL,
    `level_of_pollution` ENUM("1", "2", "3", "4", "5"),
    `location` VARCHAR(50),
    `type` ENUM("Natural", "Man-made"),
    `state_name` VARCHAR(30)
);
ALTER TABLE lakes ADD FOREIGN KEY (`state_name`) REFERENCES states(`name`) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE pollutants (
    `pollutant_id` VARCHAR(10) PRIMARY KEY,
    `name` VARCHAR(30) NOT NULL,
    `chemical_composition` VARCHAR(30),
    `source` VARCHAR(30),
    `type` VARCHAR(30),
    `severity` ENUM("High", "Medium", "Low")
);

CREATE TABLE man_made_structures (
    `structure_id` VARCHAR(10) PRIMARY KEY,
    `start_of_operation` DATE NOT NULL,
    `scale` ENUM("Small", "Medium", "Large") NOT NULL,
    `phone_number` VARCHAR(15) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `river_id` VARCHAR(10) NOT NULL,
    CONSTRAINT FOREIGN KEY (`river_id`) REFERENCES rivers(`river_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE river_pollutants (
    `river_id` VARCHAR(10),
    `pollutant_id` VARCHAR(10),
    `concentration` VARCHAR(20) NOT NULL,
    `effect` VARCHAR(100) NOT NULL,
    CONSTRAINT PRIMARY KEY (`river_id`, `pollutant_id`),
    CONSTRAINT FOREIGN KEY (`river_id`) REFERENCES rivers(`river_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FOREIGN KEY (`pollutant_id`) REFERENCES pollutants(`pollutant_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE lake_pollutants (
    `lake_id` VARCHAR(10),
    `pollutant_id` VARCHAR(10),
    `concentration` VARCHAR(20) NOT NULL,
    `effect` VARCHAR(100) NOT NULL,
    CONSTRAINT PRIMARY KEY (`lake_id`, `pollutant_id`),
    CONSTRAINT FOREIGN KEY (`lake_id`) REFERENCES lakes(`lake_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FOREIGN KEY (`pollutant_id`) REFERENCES pollutants(`pollutant_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE rivers_in_state (
    `river_id` VARCHAR(10),
    `state_name` VARCHAR(30),
    CONSTRAINT PRIMARY KEY (`river_id`, `state_name`),
    CONSTRAINT FOREIGN KEY (`river_id`) REFERENCES rivers(`river_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FOREIGN KEY (`state_name`) REFERENCES states(`name`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE pollutants_released (
    `structure_id` VARCHAR(10),
    `pollutant_id` VARCHAR(10),
    `amount_released` VARCHAR(30) NOT NULL,
    CONSTRAINT PRIMARY KEY (`structure_id`, `pollutant_id`),
    CONSTRAINT FOREIGN KEY (`structure_id`) REFERENCES man_made_structures(`structure_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FOREIGN KEY (`pollutant_id`) REFERENCES pollutants(`pollutant_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE government_bodies (
    `body_id` VARCHAR(10),
    `name` VARCHAR(45) NOT NULL,
    `city/town` VARCHAR(45) NOT NULL,
    `phone` VARCHAR(15) NOT NULL,
    `email` VARCHAR(45) NULL,
    `state_name` VARCHAR(30) NOT NULL,
    PRIMARY KEY (`body_id`)
);
ALTER TABLE government_bodies ADD CONSTRAINT FOREIGN KEY (`state_name`) REFERENCES states(`name`) ON DELETE CASCADE ON UPDATE CASCADE;
  
CREATE TABLE remedies (
    `pollutant_id` VARCHAR(10),
    `remedy_id` VARCHAR(10) NOT NULL,
    `name` VARCHAR(45) NOT NULL,
    `effect` VARCHAR(100) NOT NULL,
    `scale` VARCHAR(45) NULL,
    `avg_price` FLOAT NOT NULL,
    PRIMARY KEY (pollutant_id, remedy_id),
    CONSTRAINT FOREIGN KEY (`pollutant_id`) REFERENCES pollutants(`pollutant_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE users (
    `email` VARCHAR(50) PRIMARY KEY,
    `first_name` VARCHAR(30) NOT NULL,
    `last_name` VARCHAR(30) NOT NULL,
    `password` VARCHAR(50) NOT NULL
);

CREATE TABLE admins (
    `id` INT PRIMARY KEY,
    `first_name` VARCHAR(30) NOT NULL,
    `last_name` VARCHAR(30) NOT NULL,
    `password` VARCHAR(30) NOT NULL
);

CREATE TABLE government_users (
    `government_id` INT PRIMARY KEY,
    `first_name` VARCHAR(30) NOT NULL,
    `last_name` VARCHAR(30) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(50) NOT NULL
);

CREATE TABLE requests (
    `request_id` VARCHAR(15) PRIMARY KEY,
    `user_email` VARCHAR(50),
    `lake_id` VARCHAR(10),
    `river_id` VARCHAR(10),
    `city` VARCHAR(45) NOT NULL,
    `state_name` VARCHAR(30),
    `content` VARCHAR(300) NOT NULL,
    CONSTRAINT FOREIGN KEY (`user_email`) REFERENCES users(`email`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FOREIGN KEY (`lake_id`) REFERENCES lakes(`lake_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FOREIGN KEY (`state_name`) REFERENCES states(`name`) ON DELETE CASCADE ON UPDATE CASCADE
);