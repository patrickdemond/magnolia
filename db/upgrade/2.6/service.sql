SELECT "Replacing 'graduate' services with 'applicant' services" AS "";

UPDATE service SET subject = "applicant" WHERE subject = "graduate";

SELECT "Adding new services" AS "";

INSERT IGNORE INTO service ( subject, method, resource, restricted ) VALUES
( 'ethics_approval', 'DELETE', 1, 1 ),
( 'ethics_approval', 'GET', 0, 0 ),
( 'ethics_approval', 'GET', 1, 0 ),
( 'ethics_approval', 'PATCH', 1, 1 ),
( 'ethics_approval', 'POST', 0, 1 ),
( 'pdf_form', 'DELETE', 1, 1 ),
( 'pdf_form', 'PATCH', 1, 1 ),
( 'pdf_form', 'POST', 0, 1 );
