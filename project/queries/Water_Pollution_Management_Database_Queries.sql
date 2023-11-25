-- Create Statements

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



-- Insert Statements

INSERT INTO states (`name`, `region`) VALUES 
("Maharashtra", "West"),
("Tamil Nadu", "South"),
("Uttar Pradesh", "North"),
("Karnataka", "South"),
("Gujarat", "West"),
("Jammu and Kashmir", "North"),
("Kerala", "South"),
("Madhya Pradesh", "Central"),
("Punjab", "North"),
("Bihar", "East"),
("Assam", "Northeast"),
("West Bengal", "East"),
("Rajasthan", "West");


INSERT INTO rivers (`river_id`, `name`, `level_of_pollution`, `source`, `destination`) VALUES 
("R1", "Yamuna", "3", "Yamunotri", "Allahabad"),
("R2", "Ganges", "4", "Gangotri", "Sundarbans"),
("R3", "Krishna", "2", "Mahabaleshwar", "Bay of Bengal"),
("R4", "Cauvery", "1", "Talakaveri", "Bay of Bengal"),
("R5", "Sabarmati", "5", "Aravalli Range", "Gulf of Khambhat");


INSERT INTO lakes (`lake_id`, `name`, `level_of_pollution`, `location`, `type`, `state_name`) VALUES 
("L1", "Lonar Lake", "3", "Buldhana", "Natural", "Maharashtra"),
("L2", "Venna Lake", "1", "Mahabaleshwar", "Man-made", "Maharashtra"),
("L3", "Hemavathi Reservoir", "2", "Gorur", "Man-made", "Karnataka"),
("L4", "Kukkarahalli Lake", "4", "Mysuru", "Natural", "Karnataka"),
("L5", "Ulsoor Lake", "3", "Bengaluru", "Man-made", "Karnataka"),
("L6", "Sukhna Lake", "1", "Chandigarh", "Man-made", "Punjab"),
("L7", "Harike Wetland", "5", "Tarn Taran", "Natural", "Punjab"),
("L8", "Dhordo Reservoir", "2", "Kutch", "Man-made", "Gujarat"),
("L9", "Kanwar Lake", "4", "Begusarai", "Natural", "Bihar");


INSERT INTO pollutants (`pollutant_id`, `name`, `chemical_composition`, `source`, `type`, `severity`) VALUES 
("P1", "Mercury", "Hg", "Industrial Discharges", "Chemical", "High"),
("P2", "Polyethylene", "C2H4", "Plastic Waste", "Physical", "Medium"),
("P3", "Ammonia", "NH3", "Agricultural Runoff", "Chemical", "Low"),
("P4", "Benzene", "C6H6", "Industrial Discharges", "Chemical", "High"),
("P5", "Arsenic", "As", "Mining Runoff", "Chemical", "High"),
("P6", "Phthalates", "C8H4O2", "Plastic Waste", "Chemical", "Medium");


INSERT INTO man_made_structures (`structure_id`, `start_of_operation`, `scale`, `phone_number`, `email`, `river_id`) VALUES 
("S1", "2000-01-01", "Large", "9876543210", "structure1@example.com", "R1"),
("S2", "2015-05-15", "Medium", "8765432109", "structure2@example.com", "R3"),
("S3", "1995-10-20", "Small", "7654321098", "structure3@example.com", "R5"),
("S4", "2010-03-08", "Large", "6543210987", "structure4@example.com", "R2"),
("S5", "2005-12-25", "Medium", "5432109876", "structure5@example.com", "R4");


INSERT INTO river_pollutants (`river_id`, `pollutant_id`, `concentration`, `effect`) VALUES 
("R1", "P1", "15 ppm", "Impaired fish reproduction"),
("R2", "P2", "5 mg/L", "Harm to aquatic life"),
("R3", "P3", "10 mg/L", "Nutrient enrichment"),
("R4", "P4", "20 ppm", "Oil slick on water surface"),
("R5", "P5", "25 mg/L", "Reduced light penetration");


INSERT INTO lake_pollutants (`lake_id`, `pollutant_id`, `concentration`, `effect`) VALUES 
("L1", "P1", "8 ppm", "Algae growth"),
("L2", "P2", "3 mg/L", "Microplastic ingestion by fish"),
("L2", "P3", "5 mg/L", "Nutrient enrichment"),
("L2", "P4", "8 ppm", "Oil sheen on water"),
("L3", "P3", "7 mg/L", "Eutrophication"),
("L4", "P4", "12 ppm", "Oil sheen on water"),
("L5", "P5", "18 mg/L", "Sedimentation");


INSERT INTO rivers_in_state (`river_id`, `state_name`) VALUES 
("R1", "Uttar Pradesh"),
("R1", "Madhya Pradesh"),
("R2", "West Bengal"),
("R2", "Bihar"),
("R3", "Maharashtra"),
("R3", "Karnataka"),
("R4", "Karnataka"),
("R4", "Tamil Nadu"),
("R5", "Gujarat"),
("R5", "Rajasthan");


INSERT INTO pollutants_released (`structure_id`, `pollutant_id`, `amount_released`) VALUES 
("S1", "P1", "100 kg/year"),
("S2", "P2", "50 kg/year"),
("S3", "P3", "30 kg/year"),
("S4", "P4", "80 kg/year"),
("S5", "P5", "40 kg/year");


INSERT INTO government_bodies (`body_id`, `name`, `city/town`, `phone`, `email`, `state_name`) VALUES 
("GB1", "State Pollution Control Board", "Mumbai", "0123456789", "spcb@example.com", "Maharashtra"),
("GB2", "Environmental Department", "Chennai", "9876543210", "environment@example.com", "Tamil Nadu"),
("GB3", "Water Resources Authority", "Lucknow", "8765432109", "water_authority@example.com", "Uttar Pradesh"),
("GB4", "Forest and Environment Department", "Bangalore", "7654321098", "forest_env@example.com", "Karnataka"),
("GB5", "Gujarat Pollution Control Board", "Gandhinagar", "6543210987", "gpcb@example.com", "Gujarat");


INSERT INTO remedies (`pollutant_id`, `remedy_id`, `name`, `effect`, `scale`, `avg_price`) VALUES 
("P1", "REM1", "Phytoremediation", "Removes mercury from soil and water", "Large", 1000.00),
("P2", "REM2", "Beach Cleanup", "Reduces plastic pollution in coastal areas", "Medium", 500.00),
("P2", "REM3", "Innovative Packaging Solutions", "Promotes and implements eco-friendly packaging alternatives", "Medium", 400.00),
("P2", "REM4", "River Cleanup", "Removes polyethylene waste from rivers and water bodies", "Large", 800.00),
("P3", "REM5", "Nutrient Management", "Reduces ammonia runoff from agricultural fields", "Small", 300.00),
("P4", "REM6", "Air Quality Monitoring", "Monitors and controls benzene emissions", "Medium", 600.00),
("P4", "REM7", "Soil Remediation", "Remediates soil contaminated with benzene", "Medium", 500.00),
("P5", "REM8", "Water Treatment", "Removes arsenic from water sources", "Large", 800.00),
("P6", "REM9", "Plastic Recycling", "Recycles plastic to reduce phthalate pollution", "Medium", 450.00);


INSERT INTO admins (`id`, `first_name`, `last_name`, `password`) VALUES
(1, "Utkarsh", "Seth", "pass");



-- Creating Roles

CREATE ROLE "users"@"localhost", "admins"@"localhost", "governmentUsers"@"localhost";

GRANT ALL ON miniProject.* TO "admins"@"localhost";
GRANT SELECT ON miniProject.* TO "users"@"localhost";
GRANT INSERT ON miniProject.requests TO "users"@"localhost";
GRANT SELECT ON miniProject.* TO "governmentUsers"@"localhost";



-- Triggers

DELIMITER //
CREATE TRIGGER InsertLake
BEFORE INSERT ON lakes
FOR EACH ROW
BEGIN
    DECLARE number_of_rows INT;
    SELECT COUNT(*) INTO number_of_rows FROM lakes;
    SET NEW.lake_id = CONCAT("L", number_of_rows + 1);
END //
DELIMITER ;


DELIMITER //
CREATE TRIGGER InsertRiver
BEFORE INSERT ON rivers
FOR EACH ROW
BEGIN
    DECLARE number_of_rows INT;
    SELECT COUNT(*) INTO number_of_rows FROM rivers;
    SET NEW.river_id = CONCAT("R", number_of_rows + 1);
END //
DELIMITER ;


DELIMITER //
CREATE TRIGGER InsertRequest
BEFORE INSERT ON requests
FOR EACH ROW
BEGIN
    DECLARE number_of_rows INT;
    SELECT COUNT(*) INTO number_of_rows FROM requests;
    SET NEW.request_id = CONCAT("REQ", number_of_rows + 1);
END //
DELIMITER ;



-- Procedures with nested and join queries

DELIMITER //
CREATE PROCEDURE GetLakeDetails(IN id VARCHAR(10))
BEGIN
    WITH temp AS (
        SELECT
            L.lake_id AS lake_id,
            L.name AS lake_name,
            L.level_of_pollution,
            L.location,
            L.type,
            L.state_name,
            LP.pollutant_id,
            LP.concentration,
            LP.effect,
            P.name AS pollutant_name,
            P.chemical_composition,
            P.source,
            P.type AS pollutant_type,
            P.severity
        FROM
            (SELECT *
            FROM lakes
            WHERE lake_id = id) AS L
            JOIN lake_pollutants AS LP ON L.lake_id = LP.lake_id
            JOIN pollutants AS P ON LP.pollutant_id = P.pollutant_id
    )
    SELECT 
        temp.*,
        R.remedy_id,
        R.name AS remedy_name,
        R.effect AS remedy_effect,
        R.scale AS remedy_scale,
        R.avg_price AS remedy_avg_price
    FROM temp
    JOIN remedies AS R ON temp.pollutant_id = R.pollutant_id;
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE GetRiverDetails(IN id VARCHAR(10))
BEGIN
    WITH temp AS (
        SELECT
            RI.river_id AS river_id,
            RI.name AS river_name,
            RI.level_of_pollution,
            RI.source AS source,
            RI.destination AS destination,
            RP.pollutant_id,
            RP.concentration,
            RP.effect,
            P.name AS pollutant_name,
            P.chemical_composition,
            P.source AS pollutant_source,
            P.type AS pollutant_type,
            P.severity
        FROM
            (SELECT *
            FROM rivers
            WHERE river_id = id) AS RI
            JOIN river_pollutants AS RP ON RI.river_id = RP.river_id
            JOIN pollutants AS P ON RP.pollutant_id = P.pollutant_id
    )
    SELECT 
        temp.*,
        R.remedy_id,
        R.name AS remedy_name,
        R.effect AS remedy_effect,
        R.scale AS remedy_scale,
        R.avg_price AS remedy_avg_price
    FROM temp
    JOIN remedies AS R ON temp.pollutant_id = R.pollutant_id;
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE InsertUserDetails(IN user_email VARCHAR(50))
BEGIN
    SET @create_user_query = CONCAT("CREATE USER ", CONCAT_WS('@', QUOTE(user_email), 'localhost'), ";");
    PREPARE create_user_stmt FROM @create_user_query;
    EXECUTE create_user_stmt;
    DEALLOCATE PREPARE create_user_stmt;

    SET @grant_query = CONCAT("GRANT 'users'@'localhost' TO ", CONCAT_WS('@', QUOTE(user_email), 'localhost'), ";");
    PREPARE grant_stmt FROM @grant_query;
    EXECUTE grant_stmt;
    DEALLOCATE PREPARE grant_stmt;
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE InsertGovernmentUserDetails(IN user_email VARCHAR(50))
BEGIN
    SET @create_user_query = CONCAT("CREATE USER ", CONCAT_WS('@', QUOTE(user_email), 'localhost'), ";");
    PREPARE create_user_stmt FROM @create_user_query;
    EXECUTE create_user_stmt;
    DEALLOCATE PREPARE create_user_stmt;

    SET @grant_query = CONCAT("GRANT 'governmentUsers'@'localhost' TO ", CONCAT_WS('@', QUOTE(user_email), 'localhost'), ";");
    PREPARE grant_stmt FROM @grant_query;
    EXECUTE grant_stmt;
    DEALLOCATE PREPARE grant_stmt;
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE InsertAdminDetails(IN user_email VARCHAR(50))
BEGIN
    SET @create_user_query = CONCAT("CREATE USER ", CONCAT_WS('@', QUOTE(user_email), 'localhost'), ";");
    PREPARE create_user_stmt FROM @create_user_query;
    EXECUTE create_user_stmt;
    DEALLOCATE PREPARE create_user_stmt;

    SET @grant_query = CONCAT("GRANT 'admins'@'localhost' TO ", CONCAT_WS('@', QUOTE(user_email), 'localhost'), ";");
    PREPARE grant_stmt FROM @grant_query;
    EXECUTE grant_stmt;
    DEALLOCATE PREPARE grant_stmt;
END //
DELIMITER ;



-- Functions with aggregate queries

DELIMITER //
CREATE FUNCTION getTotalBodiesInState(input_state VARCHAR(30))
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE number_of_rivers INT;
    DECLARE number_of_lakes INT;

    SELECT COUNT(*)
    INTO number_of_rivers
    FROM (
        SELECT state_name, river_id
        FROM rivers_in_state
        WHERE state_name = input_state
    ) AS num_rivers
    GROUP BY state_name;

    SELECT COUNT(*)
    INTO number_of_lakes
    FROM (
        SELECT state_name, lake_id
        FROM lakes
        WHERE state_name = input_state
    ) AS num_lakes
    GROUP BY state_name;

    IF number_of_lakes IS NULL AND number_of_rivers IS NULL THEN
        RETURN 0;
    ELSEIF number_of_lakes IS NULL THEN
        RETURN number_of_rivers;
    ELSEIF number_of_rivers IS NULL THEN
        RETURN number_of_lakes;
    ELSE
        RETURN number_of_rivers + number_of_lakes;
    END IF;
END //
DELIMITER ;