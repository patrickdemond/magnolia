DROP PROCEDURE IF EXISTS patch_reqn;
DELIMITER //
CREATE PROCEDURE patch_reqn()
  BEGIN

    SELECT "Removing reqn.applicant_name column" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "applicant_name";

    IF @test = 1 THEN
      ALTER TABLE reqn DROP COLUMN applicant_name;
    END IF;

    SELECT "Removing reqn.applicant_position column" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "applicant_position";

    IF @test = 1 THEN
      ALTER TABLE reqn DROP COLUMN applicant_position;
    END IF;

    SELECT "Removing reqn.applicant_affiliation column" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "applicant_affiliation";

    IF @test = 1 THEN
      ALTER TABLE reqn DROP COLUMN applicant_affiliation;
    END IF;

    SELECT "Removing reqn.applicant_address column" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "applicant_address";

    IF @test = 1 THEN
      ALTER TABLE reqn DROP COLUMN applicant_address;
    END IF;

    SELECT "Removing reqn.applicant_phone column" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "applicant_phone";

    IF @test = 1 THEN
      ALTER TABLE reqn DROP COLUMN applicant_phone;
    END IF;

    SELECT "Removing reqn.applicant_email column" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "applicant_email";

    IF @test = 1 THEN
      ALTER TABLE reqn DROP COLUMN applicant_email;
    END IF;

    SELECT "Removing reqn.graduate_name column" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "graduate_name";

    IF @test = 1 THEN
      ALTER TABLE reqn DROP COLUMN graduate_name;
    END IF;

    SELECT "Removing reqn.graduate_program column" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "graduate_program";

    IF @test = 1 THEN
      ALTER TABLE reqn DROP COLUMN graduate_program;
    END IF;

    SELECT "Removing reqn.graduate_institution column" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "graduate_institution";

    IF @test = 1 THEN
      ALTER TABLE reqn DROP COLUMN graduate_institution;
    END IF;

    SELECT "Removing reqn.graduate_address column" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "graduate_address";

    IF @test = 1 THEN
      ALTER TABLE reqn DROP COLUMN graduate_address;
    END IF;

    SELECT "Removing reqn.graduate_phone column" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "graduate_phone";

    IF @test = 1 THEN
      ALTER TABLE reqn DROP COLUMN graduate_phone;
    END IF;

    SELECT "Removing reqn.graduate_email column" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "graduate_email";

    IF @test = 1 THEN
      ALTER TABLE reqn DROP COLUMN graduate_email;
    END IF;

    SELECT "Removing reqn.start_date column" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "start_date";

    IF @test = 1 THEN
      ALTER TABLE reqn DROP COLUMN start_date;
    END IF;

    SELECT "Removing reqn.duration column" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "duration";

    IF @test = 1 THEN
      ALTER TABLE reqn DROP COLUMN duration;
    END IF;

    SELECT "Removing reqn.title column" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "title";

    IF @test = 1 THEN
      ALTER TABLE reqn DROP COLUMN title;
    END IF;

    SELECT "Removing reqn.keywords column" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "keywords";

    IF @test = 1 THEN
      ALTER TABLE reqn DROP COLUMN keywords;
    END IF;

    SELECT "Removing reqn.lay_summary column" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "lay_summary";

    IF @test = 1 THEN
      ALTER TABLE reqn DROP COLUMN lay_summary;
    END IF;

    SELECT "Removing reqn.background column" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "background";

    IF @test = 1 THEN
      ALTER TABLE reqn DROP COLUMN background;
    END IF;

    SELECT "Removing reqn.objectives column" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "objectives";

    IF @test = 1 THEN
      ALTER TABLE reqn DROP COLUMN objectives;
    END IF;

    SELECT "Removing reqn.methodology column" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "methodology";

    IF @test = 1 THEN
      ALTER TABLE reqn DROP COLUMN methodology;
    END IF;

    SELECT "Removing reqn.analysis column" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "analysis";

    IF @test = 1 THEN
      ALTER TABLE reqn DROP COLUMN analysis;
    END IF;

    SELECT "Removing reqn.funding column" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "funding";

    IF @test = 1 THEN
      ALTER TABLE reqn DROP COLUMN funding;
    END IF;

    SELECT "Removing reqn.funding_filename column" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "funding_filename";

    IF @test = 1 THEN
      ALTER TABLE reqn DROP COLUMN funding_filename;
    END IF;

    SELECT "Removing reqn.funding_agency column" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "funding_agency";

    IF @test = 1 THEN
      ALTER TABLE reqn DROP COLUMN funding_agency;
    END IF;

    SELECT "Removing reqn.grant_number column" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "grant_number";

    IF @test = 1 THEN
      ALTER TABLE reqn DROP COLUMN grant_number;
    END IF;

    SELECT "Removing reqn.ethics column" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "ethics";

    IF @test = 1 THEN
      ALTER TABLE reqn DROP COLUMN ethics;
    END IF;

    SELECT "Removing reqn.ethics_date column" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "ethics_date";

    IF @test = 1 THEN
      ALTER TABLE reqn DROP COLUMN ethics_date;
    END IF;

    SELECT "Removing reqn.ethics_filename column" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "ethics_filename";

    IF @test = 1 THEN
      ALTER TABLE reqn DROP COLUMN ethics_filename;
    END IF;

    SELECT "Removing reqn.waiver column" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "waiver";

    IF @test = 1 THEN
      ALTER TABLE reqn DROP COLUMN waiver;
    END IF;

    SELECT "Removing reqn.comprehensive column" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "comprehensive";

    IF @test = 1 THEN
      ALTER TABLE reqn DROP COLUMN comprehensive;
    END IF;

    SELECT "Removing reqn.tracking column" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "tracking";

    IF @test = 1 THEN
      ALTER TABLE reqn DROP COLUMN tracking;
    END IF;

    SELECT "Removing reqn.part2_a_comment column" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "part2_a_comment";

    IF @test = 1 THEN
      ALTER TABLE reqn DROP COLUMN part2_a_comment;
    END IF;

    SELECT "Removing reqn.part2_b_comment column" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "part2_b_comment";

    IF @test = 1 THEN
      ALTER TABLE reqn DROP COLUMN part2_b_comment;
    END IF;

    SELECT "Removing reqn.part2_c_comment column" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "part2_c_comment";

    IF @test = 1 THEN
      ALTER TABLE reqn DROP COLUMN part2_c_comment;
    END IF;

    SELECT "Removing reqn.part2_d_comment column" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "part2_d_comment";

    IF @test = 1 THEN
      ALTER TABLE reqn DROP COLUMN part2_d_comment;
    END IF;

    SELECT "Removing reqn.part2_e_comment column" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "part2_e_comment";

    IF @test = 1 THEN
      ALTER TABLE reqn DROP COLUMN part2_e_comment;
    END IF;

    SELECT "Removing reqn.part2_f_comment column" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "part2_f_comment";

    IF @test = 1 THEN
      ALTER TABLE reqn DROP COLUMN part2_f_comment;
    END IF;

    SELECT "Adding new suggested_revisions column to reqn table" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "suggested_revisions";

    IF @test = 0 THEN
      ALTER TABLE reqn
      ADD COLUMN suggested_revisions TINYINT(1) NOT NULL DEFAULT 0 AFTER instruction_filename;
    END IF;

    SELECT "Adding new deferral_note_amendment column to reqn table" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "deferral_note_amendment";

    IF @test = 0 THEN
      ALTER TABLE reqn
      ADD COLUMN deferral_note_amendment TEXT NULL DEFAULT NULL AFTER suggested_revisions;
    END IF;

    SELECT "Renaming deferral_note_part1_a1 column to deferral_note_1a in reqn table" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "deferral_note_part1_a1";

    IF @test = 1 THEN
      ALTER TABLE reqn CHANGE deferral_note_part1_a1 deferral_note_1a text;
    END IF;

    SELECT "Renaming deferral_note_part1_a2 column to deferral_note_1b in reqn table" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "deferral_note_part1_a2";

    IF @test = 1 THEN
      ALTER TABLE reqn CHANGE deferral_note_part1_a2 deferral_note_1b text;
    END IF;

    SELECT "Renaming deferral_note_part1_a3 column to deferral_note_1c in reqn table" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "deferral_note_part1_a3";

    IF @test = 1 THEN
      ALTER TABLE reqn CHANGE deferral_note_part1_a3 deferral_note_1c text;
    END IF;

    SELECT "Renaming deferral_note_part1_a4 column to deferral_note_1d in reqn table" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "deferral_note_part1_a4";

    IF @test = 1 THEN
      ALTER TABLE reqn CHANGE deferral_note_part1_a4 deferral_note_1d text;
    END IF;

    SELECT "Renaming deferral_note_part1_a5 column to deferral_note_1e in reqn table" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "deferral_note_part1_a5";

    IF @test = 1 THEN
      ALTER TABLE reqn CHANGE deferral_note_part1_a5 deferral_note_1e text;
    END IF;

    SELECT "Renaming deferral_note_part1_a6 column to deferral_note_1f in reqn table" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "deferral_note_part1_a6";

    IF @test = 1 THEN
      ALTER TABLE reqn CHANGE deferral_note_part1_a6 deferral_note_1f text;
    END IF;

    SELECT "Renaming deferral_note_part2_a column to deferral_note_2a in reqn table" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "deferral_note_part2_a";

    IF @test = 1 THEN
      ALTER TABLE reqn CHANGE deferral_note_part2_a deferral_note_2a text;
    END IF;

    SELECT "Renaming deferral_note_part2_b column to deferral_note_2b in reqn table" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "deferral_note_part2_b";

    IF @test = 1 THEN
      ALTER TABLE reqn CHANGE deferral_note_part2_b deferral_note_2b text;
    END IF;

    SELECT "Renaming deferral_note_part2_c column to deferral_note_2c in reqn table" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "deferral_note_part2_c";

    IF @test = 1 THEN
      ALTER TABLE reqn CHANGE deferral_note_part2_c deferral_note_2c text;
    END IF;

    SELECT "Renaming deferral_note_part2_d column to deferral_note_2d in reqn table" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "deferral_note_part2_d";

    IF @test = 1 THEN
      ALTER TABLE reqn CHANGE deferral_note_part2_d deferral_note_2d text;
    END IF;

    SELECT "Renaming deferral_note_part2_e column to deferral_note_2e in reqn table" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "deferral_note_part2_e";

    IF @test = 1 THEN
      ALTER TABLE reqn CHANGE deferral_note_part2_e deferral_note_2e text;
    END IF;

    SELECT "Renaming deferral_note_part2_f column to deferral_note_2f in reqn table" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "deferral_note_part2_f";

    IF @test = 1 THEN
      ALTER TABLE reqn CHANGE deferral_note_part2_f deferral_note_2f text;
    END IF;

    SELECT "Adding new graduate_id column to reqn table" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "graduate_id";

    IF @test = 0 THEN
      ALTER TABLE reqn
      ADD COLUMN graduate_id INT UNSIGNED NULL DEFAULT NULL AFTER user_id,
      ADD INDEX fk_graduate_id (graduate_id ASC),
      ADD CONSTRAINT fk_graduate_id
          FOREIGN KEY (graduate_id)
          REFERENCES graduate (id)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION;
    END IF;

    SELECT "Adding new note column to reqn table" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "note";

    IF @test = 0 THEN
      ALTER TABLE reqn
      ADD COLUMN note TEXT NULL DEFAULT NULL;
    END IF;

    SELECT "Adding new reqn_type_id column to reqn table" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "reqn_type_id";

    IF @test = 0 THEN
      ALTER TABLE reqn
      ADD COLUMN reqn_type_id INT UNSIGNED NOT NULL AFTER create_timestamp;

      UPDATE reqn SET reqn_type_id = ( SELECT id FROM reqn_type WHERE name = "Standard" );

      ALTER TABLE reqn
      ADD INDEX fk_reqn_type_id (reqn_type_id ASC),
      ADD CONSTRAINT fk_reqn_type_id
          FOREIGN KEY (reqn_type_id)
          REFERENCES reqn_type (id)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION;
    END IF;

    SELECT "Making deadline_id nullable in reqn table" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "deadline_id"
    AND is_nullable = "NO";

    IF @test = 1 THEN
      ALTER TABLE reqn MODIFY COLUMN deadline_id int(10) unsigned NULL DEFAULT NULL;
    END IF;

    ALTER TABLE reqn MODIFY data_directory VARCHAR(45) NULL DEFAULT NULL;

    SELECT "Adding new data_expiry_date column to reqn table" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "data_expiry_date";

    IF @test = 0 THEN
      ALTER TABLE reqn ADD COLUMN data_expiry_date DATE NULL DEFAULT NULL AFTER data_directory;
    END IF;

    SELECT "Removing agreement_filename column" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "agreement_filename";

    IF @test = 1 THEN
      ALTER TABLE reqn DROP COLUMN agreement_filename;
    END IF;

    SELECT "Removing decision_notice column" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "decision_notice";

    IF @test = 1 THEN
      SELECT "Moving decision notices from reqn to notice table" AS "";
      INSERT INTO notice( reqn_id, datetime, title, description )
      SELECT reqn.id, CONVERT_TZ( stage.update_timestamp, "Canada/Eastern", "UTC" ), "Notice of decision", decision_notice
      FROM reqn
      JOIN stage ON reqn.id = stage.reqn_id
      JOIN stage_type ON stage.stage_type_id = stage_type.id
      WHERE stage_type.name = "Decision Made"
      AND decision_notice IS NOT NULL;

      ALTER TABLE reqn DROP COLUMN decision_notice;
    END IF;

    SELECT "Adding new state_date column to reqn table" AS "";

    SELECT COUNT(*) INTO @test
    FROM information_schema.COLUMNS
    WHERE table_schema = DATABASE()
    AND table_name = "reqn"
    AND column_name = "state_date";

    IF @test = 0 THEN
      ALTER TABLE reqn
      ADD COLUMN state_date DATE NULL DEFAULT NULL AFTER state,
      ADD INDEX dk_state_date (state_date ASC);

      -- immediately set the state date for those reqns already in a state
      UPDATE reqn
      SET state_date = DATE( CONVERT_TZ( update_timestamp, 'Canada/Eastern', 'UTC' ) )
      WHERE state IS NOT NULL;
    END IF;

  END //
DELIMITER ;

CALL patch_reqn();
DROP PROCEDURE IF EXISTS patch_reqn;


DELIMITER $$

DROP TRIGGER IF EXISTS reqn_BEFORE_UPDATE $$
CREATE DEFINER = CURRENT_USER TRIGGER reqn_BEFORE_UPDATE BEFORE UPDATE ON reqn FOR EACH ROW
BEGIN
  IF !( NEW.state <=> OLD.state ) THEN
    SET NEW.state_date = IF( NEW.state IS NULL, NULL, UTC_TIMESTAMP() );
  END IF;
END$$

DELIMITER ;
