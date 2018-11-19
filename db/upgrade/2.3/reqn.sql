DROP PROCEDURE IF EXISTS patch_applicant;
DELIMITER //
CREATE PROCEDURE patch_applicant()
  BEGIN

    SELECT "Adding in new reqn.funding_filename column" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "funding_filename";

    IF @test = 0 THEN
      ALTER TABLE reqn
      ADD COLUMN funding_filename VARCHAR(255) NULL DEFAULT NULL AFTER funding;
    END IF;

    SELECT "Adding in new reqn.data_directory column" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "data_directory";

    IF @test = 0 THEN
      ALTER TABLE reqn
      ADD COLUMN data_directory VARCHAR(45) NOT NULL AFTER identifier;

      -- set a temporary value so we can add the unique key
      UPDATE reqn SET data_directory = id;
      ALTER TABLE reqn
      ADD UNIQUE INDEX uq_data_directory (data_directory ASC);
    END IF;

  END //
DELIMITER ;

CALL patch_applicant();
DROP PROCEDURE IF EXISTS patch_applicant;