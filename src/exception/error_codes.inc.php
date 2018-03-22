<?php
/**
 * error_codes.inc.php
 * 
 * This file is where all error codes are defined.
 * All error code are named after the class and function they occur in.
 */

/**
 * Error number category defines.
 */
define( 'ARGUMENT_MAGNOLIA_BASE_ERRNO',   190000 );
define( 'DATABASE_MAGNOLIA_BASE_ERRNO',   290000 );
define( 'LDAP_MAGNOLIA_BASE_ERRNO',       390000 );
define( 'NOTICE_MAGNOLIA_BASE_ERRNO',     490000 );
define( 'PERMISSION_MAGNOLIA_BASE_ERRNO', 590000 );
define( 'RUNTIME_MAGNOLIA_BASE_ERRNO',    690000 );
define( 'SYSTEM_MAGNOLIA_BASE_ERRNO',     790000 );
define( 'VOIP_MAGNOLIA_BASE_ERRNO',       990000 );

/**
 * "argument" error codes
 */
define( 'ARGUMENT__MAGNOLIA_DATABASE_REQN__ADD_TO_STAGE__ERRNO',
        ARGUMENT_MAGNOLIA_BASE_ERRNO + 1 );

/**
 * "database" error codes
 * 
 * Since database errors already have codes this list is likely to stay empty.
 */

/**
 * "ldap" error codes
 * 
 * Since ldap errors already have codes this list is likely to stay empty.
 */

/**
 * "notice" error codes
 */

/**
 * "permission" error codes
 */

/**
 * "runtime" error codes
 */
define( 'RUNTIME__MAGNOLIA_DATABASE_REQN__ASSERT_DEADLINE__ERRNO',
        RUNTIME_MAGNOLIA_BASE_ERRNO + 1 );
define( 'RUNTIME__MAGNOLIA_DATABASE_REQN__ADD_TO_STAGE__ERRNO',
        RUNTIME_MAGNOLIA_BASE_ERRNO + 2 );
define( 'RUNTIME__MAGNOLIA_SERVICE_REQN_PATCH__EXECUTE__ERRNO',
        RUNTIME_MAGNOLIA_BASE_ERRNO + 3 );

/**
 * "system" error codes
 * 
 * Since system errors already have codes this list is likely to stay empty.
 * Note the following PHP error codes:
 *      1: error,
 *      2: warning,
 *      4: parse,
 *      8: notice,
 *     16: core error,
 *     32: core warning,
 *     64: compile error,
 *    128: compile warning,
 *    256: user error,
 *    512: user warning,
 *   1024: user notice
 */

/**
 * "voip" error codes
 */

