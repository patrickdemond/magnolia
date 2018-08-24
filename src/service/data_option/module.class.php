<?php
/**
 * module.class.php
 * 
 * @author Patrick Emond <emondpd@mcmaster.ca>
 * @filesource
 */

namespace magnolia\service\data_option;
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

    $modifier->join( 'data_option_category', 'data_option.data_option_category_id', 'data_option_category.id' );

    if( $select->has_column( 'footnote_id_list' ) )
    {
      $modifier->left_join(
        'data_option_has_footnote',
        'data_option.id',
        'data_option_has_footnote.data_option_id'
      );
      $modifier->group( 'data_option.id' );

      $select->add_column( 'GROUP_CONCAT( data_option_has_footnote.footnote_id )', 'footnote_id_list', false );
    }
  }
}
