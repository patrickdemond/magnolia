-- Patch to upgrade database to version 2.2

SET AUTOCOMMIT=0;

SOURCE role.sql
SOURCE application_type.sql
SOURCE application_type_has_role.sql
SOURCE application.sql
SOURCE application_has_site.sql

SOURCE access.sql
SOURCE service.sql
SOURCE role_has_service.sql
SOURCE setting.sql
SOURCE writelog.sql

SOURCE deadline.sql
SOURCE requisition.sql
SOURCE coapplicant.sql
SOURCE reference.sql
SOURCE data_option_parent.sql
SOURCE data_option_subcategory.sql
SOURCE data_option.sql
SOURCE requisition_has_data_option.sql
SOURCE progress_report.sql
SOURCE production_type.sql
SOURCE production.sql
SOURCE stage_type.sql
SOURCE stage_type_has_stage_type.sql
SOURCE stage.sql
SOURCE requisition_last_stage.sql

SOURCE update_requisition_last_stage.sql
SOURCE update_version_number.sql

COMMIT;
