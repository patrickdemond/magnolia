SELECT "Creating new data_option_category table" AS "";

CREATE TABLE IF NOT EXISTS data_option_category (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  update_timestamp TIMESTAMP NOT NULL,
  create_timestamp TIMESTAMP NOT NULL,
  rank INT UNSIGNED NOT NULL,
  name_en VARCHAR(127) NOT NULL,
  name_fr VARCHAR(127) NOT NULL,
  comprehensive TINYINT(1) NOT NULL DEFAULT 0,
  tracking TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  UNIQUE INDEX uq_rank (rank ASC))
ENGINE = InnoDB;

INSERT IGNORE INTO data_option_category( rank, name_en, name_fr, comprehensive, tracking ) VALUES
( 1, "Section A: Questionnaires", "Section A: Questionnaires", 1, 1 ),
( 2, "Section B: Physical Assessment Variables", "Section B: Variables tirées d’évaluations physiques", 1, 0 ),
( 3, "Section C: Biomarkers", "Section C: Biomarqueurs", 1, 0),
( 4, "Section D: Genomics", "Section D: Genomique", 1, 0 ),
( 5, "Section E: Linked Data", "Section E: Données liées", 1, 1 );