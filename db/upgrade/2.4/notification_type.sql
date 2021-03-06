SELECT "Adding new notification types" AS "";

INSERT IGNORE INTO notification_type SET
  name = "Review Assigned",
  title_en = "Magnolia - Requisition {{identifier}} review",
  title_fr = "Magnolia - Requisition {{identifier}} review",
  message_en = "You have been assigned to review the following requisition:

Identifier: {{identifier}}
Applicant: {{applicant_name}}
Title: ({{title}}",
  message_fr = "You have been assigned to review the following requisition:

Identifier: {{identifier}}
Applicant: {{applicant_name}}
Title: ({{title}}";

INSERT IGNORE INTO notification_type SET
  name = "Approval Required",
  title_en = "CLSA Data Access - Approval Required",
  title_fr = "Accès aux données de l’ÉLCV - Approbation requise",
  message_en = "Dear Dr. {{applicant_name}},

Your approval is required on your application number {{identifier}}, on behalf of {{graduate_name}}, entitled {{title}}.

Please log in to the CLSA online data application software, Magnolia (https://magnolia.clsa-elcv.ca/live/gl/). Review the application and, if you are satisfied, submit the application.

Your application will continue through the review process and you will be contacted with the outcome at a later date.

If you have any questions, please contact us at access@clsa-elcv.ca.

The CLSA Data Access Team",
  message_fr = "Bonjour Dr {{applicant_name}},

La demande d’accès {{identifier}}, intitulée {{title}}, pour le projet de {{graduate_name}} requiert votre approbation.

Veuillez vous connecter à Magnolia, le logiciel de demande d’accès aux données en ligne de l’ÉLCV (https://magnolia.clsa-elcv.ca/live/gl/), pour passer la demande en revue. Si celle-ci vous satisfait, soumettez-la.

Votre demande passera alors à la prochaine étape du processus d’évaluation et nous vous communiquerons le résultat ultérieurement.

Si vous avez des questions, veuillez nous contacter à access@clsa-elcv.ca.

L’équipe d’accès aux données de l’ÉLCV";

INSERT IGNORE INTO notification_type SET
  name = "Amendment Started",
  title_en = "CLSA Data Access - New Amendment Started",
  title_fr = "Accès aux données de l’ÉLCV - ",
  message_en = "Dear Dr. {{applicant_name}},

A new amendment process has been started for your application number {{identifier}}, entitled {{title}}.

Please log in to the CLSA online data application software, Magnolia (https://magnolia.clsa-elcv.ca/live/gl/). Make the desired changes and re-submit the application.

Your application will proceed through the amendment review process and you will be contacted with the outcome at a later date.

If you have any questions, please contact us at access@clsa-elcv.ca.

The CLSA Data Access Team",
  message_fr = "";
