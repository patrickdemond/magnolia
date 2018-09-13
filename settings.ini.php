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
$SETTINGS['general']['build'] = '6dfdef6';

// the location of magnolia internal path
$SETTINGS['path']['APPLICATION'] = str_replace( '/settings.ini.php', '', __FILE__ );

// the location of deployment reports (defaults to magnolia/doc/ethics_letter)
$SETTINGS['path']['ETHICS_LETTER'] = str_replace( 'settings.ini.php', 'doc/ethics_letter', __FILE__ );

// the location of agreement letters (defaults to magnolia/doc/agreement_letter)
$SETTINGS['path']['AGREEMENT_LETTER'] = str_replace( 'settings.ini.php', 'doc/agreement_letter', __FILE__ );

// the location of PDF form templates (defaults to magnolia/doc/pdf_form)
$SETTINGS['path']['PDF_FORM'] = str_replace( 'settings.ini.php', 'doc/pdf_form', __FILE__ );

// the location of reqn forms (defaults to magnolia/doc/reqn)
$SETTINGS['path']['REQN'] = str_replace( 'settings.ini.php', 'doc/reqn', __FILE__ );

// add modules used by the application
$SETTINGS['module']['pdf'] = true;
