SELECT "Creating new stage_type table" AS "";

CREATE TABLE IF NOT EXISTS stage_type (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  update_timestamp TIMESTAMP NOT NULL,
  create_timestamp TIMESTAMP NOT NULL,
  phase ENUM("new", "review", "agreement", "complete") NOT NULL,
  rank INT UNSIGNED NOT NULL,
  name VARCHAR(45) NOT NULL,
  status VARCHAR(45) NOT NULL,
  preperation_required TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  UNIQUE INDEX uq_name (name ASC),
  UNIQUE INDEX uq_rank (rank ASC))
ENGINE = InnoDB;

INSERT IGNORE INTO stage_type( phase, rank, name, status, preperation_required ) VALUES
( "New", 1, "New", "New", 0 ),
( "Review", 2, "Admin Review", "Under Review", 0 ),
( "Review", 3, "SAC Review", "Under Review", 0 ),
( "Review", 4, "DSAC Selection", "Under Review", 1 ),
( "Review", 5, "DSAC Review", "Under Review", 1 ),
( "Review", 6, "SMT Review", "Under Review", 1 ),
( "Review", 7, "Not Approved", "Notice of Decision", 0 ),
( "Review", 8, "Conditionally Approved", "Notice of Decision", 0 ),
( "Agreement", 9, "Approved", "Agreement in Preperation", 1 ),
( "Agreement", 10, "Data Release", "Preparing Data", 0 ),
( "Agreement", 11, "Active", "Active", 0 ),
( "Agreement", 12, "Report Required", "Report Required", 0 ),
( "Complete", 13, "Complete", "Complete", 0 );