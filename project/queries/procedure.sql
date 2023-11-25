USE miniProject;


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