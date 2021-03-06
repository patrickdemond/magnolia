<?php
/**
 * module.class.php
 * 
 * @author Patrick Emond <emondpd@mcmaster.ca>
 * @filesource
 */

namespace magnolia\service\data_option_detail;
use cenozo\lib, cenozo\log, magnolia\util;

/**
 * Performs operations which effect how this module is used in a service
 */
class module extends \cenozo\service\module
{
  /**
   * Extend parent method
   */
  public function prepare_read( $select, $modifier )
  {
    parent::prepare_read( $select, $modifier );

    $modifier->join( 'data_option', 'data_option_detail.data_option_id', 'data_option.id' );
    $modifier->join( 'data_option_category', 'data_option.data_option_category_id', 'data_option_category.id' );
    $modifier->join( 'study_phase', 'data_option_detail.study_phase_id', 'study_phase.id' );
  }
}
