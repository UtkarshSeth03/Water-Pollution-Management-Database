USE miniProject;

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