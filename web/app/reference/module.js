define( function() {
  'use strict';

  try { var module = cenozoApp.module( 'reference', true ); } catch( err ) { console.warn( err ); return; }
  angular.extend( module, {
    identifier: {
      parent: {
        subject: 'reqn_version',
        column: 'id'
      }
    },
    name: {
      singular: 'reference',
      plural: 'references',
      possessive: 'reference\'s'
    }
  } );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnReferenceAddFactory', [
    'CnBaseAddFactory',
    function( CnBaseAddFactory ) {
      var object = function( parentModel ) { CnBaseAddFactory.construct( this, parentModel ); };
      return { instance: function( parentModel ) { return new object( parentModel ); } };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnReferenceModelFactory', [
    'CnBaseModelFactory', 'CnReferenceAddFactory',
    function( CnBaseModelFactory, CnReferenceAddFactory ) {
      var object = function( root ) {
        var self = this;
        CnBaseModelFactory.construct( this, module );
        this.addModel = CnReferenceAddFactory.instance( this );
      };

      return { instance: function() { return new object( false ); } };
    }
  ] );

} );
