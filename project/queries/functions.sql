USE miniProject;


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