DROP PROCEDURE IF EXISTS patch_role_has_service;
DELIMITER //
CREATE PROCEDURE patch_role_has_service()
  BEGIN

    -- determine the cenozo database name
    SET @cenozo = (
      SELECT unique_constraint_schema
      FROM information_schema.referential_constraints
      WHERE constraint_schema = DATABASE()
      AND constraint_name = "fk_access_site_id"
    );

    SELECT "Removing non read-only services from readonly role" AS "";

    SET @sql = CONCAT(
      "DELETE FROM role_has_service ",
      "WHERE role_id = ( SELECT id FROM ", @cenozo, ".role WHERE name = 'readonly' ) ",
      "AND service_id IN ( SELECT id FROM service WHERE method = 'PATCH' )"
    );
    PREPARE statement FROM @sql;
    EXECUTE statement;
    DEALLOCATE PREPARE statement;

    SELECT "Adding GET stage_type services to readonly role" AS "";

    SET @sql = CONCAT(
      "INSERT IGNORE INTO role_has_service( role_id, service_id ) ",
      "SELECT role.id, service.id ",
      "FROM ", @cenozo, ".role, service ",
      "WHERE role.name = 'readonly' ",
      "AND service.subject IN( 'notification_type', 'review_type', 'stage_type' ) ",
      "AND service.method = 'GET' ",
      "AND service.restricted = 1"
    );
    PREPARE statement FROM @sql;
    EXECUTE statement;
    DEALLOCATE PREPARE statement;

  END //
DELIMITER ;

CALL patch_role_has_service();
DROP PROCEDURE IF EXISTS patch_role_has_service;
