<?php
/**
 * settings.ini.php
 *
 * Defines initialization settings for magnolia.
 * DO NOT edit this file, to override these settings use settings.local.ini.php instead.
 * Any changes in the local ini file will override the settings found here.
 */

global $SETTINGS;

// tagged version
$SETTINGS['general']['application_name'] = 'magnolia';
$SETTINGS['general']['instance_name'] = $SETTINGS['general']['application_name'];
$SETTINGS['general']['version'] = '2.2';
$SETTINGS['general']['build'] = '6e8dada';

// the location of magnolia internal path
$SETTINGS['path']['APPLICATION'] = str_replace( '/settings.ini.php', '', __FILE__ );

// the location of deployment reports (defaults to magnolia/doc/ethics_letter)
$SETTINGS['path']['ETHICS_LETTER'] = str_replace( 'settings.ini.php', 'doc/ethics_letter', __FILE__ );
