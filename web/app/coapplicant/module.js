define( function() {
  'use strict';

  try { var module = cenozoApp.module( 'coapplicant', true ); } catch( err ) { console.warn( err ); return; }
  angular.extend( module, {
    identifier: {
      parent: {
        subject: 'reqn_version',
        column: 'id'
      }
    },
    name: {
      singular: 'co-applicant',
      plural: 'co-applicants',
      possessive: 'co-applicant\'s'
    }
  } );

  module.addInputGroup( '', {
    name: { title: 'Name', type: 'string' },
    position: { title: 'Position', type: 'string' },
    affiliation: { title: 'Affiliation', type: 'string' },
    email: { title: 'E-mail', type: 'string', format: 'email' },
    role: { title: 'Role', type: 'string' },
    access: { title: 'Access', type: 'boolean', type: 'boolean' }
  } );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnCoapplicantAddFactory', [
    'CnBaseAddFactory',
    function( CnBaseAddFactory ) {
      var object = function( parentModel ) { CnBaseAddFactory.construct( this, parentModel ); };
      return { instance: function( parentModel ) { return new object( parentModel ); } };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnCoapplicantModelFactory', [
    'CnBaseModelFactory', 'CnCoapplicantAddFactory',
    function( CnBaseModelFactory, CnCoapplicantAddFactory ) {
      var object = function( root ) {
        var self = this;
        CnBaseModelFactory.construct( this, module );
        this.addModel = CnCoapplicantAddFactory.instance( this );
      };

      return { instance: function() { return new object( false ); } };
    }
  ] );

} );
