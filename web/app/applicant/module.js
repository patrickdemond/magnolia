define( function() {
  'use strict';

  try { var module = cenozoApp.module( 'applicant', true ); } catch( err ) { console.warn( err ); return; }
  angular.extend( module, {
    identifier: {},
    name: {
      singular: 'trainee',
      plural: 'trainees',
      possessive: 'trainee\'s'
    },
    columnList: {
      supervisor_full_name: {
        title: 'Supervisor',
        isIncluded: function( $state, model ) { return 'applicant.list' == $state.current.name; }
      },
      user_full_name: {
        title: 'Trainee'
      },
      user_name: {
        column: 'user.name',
        isIncluded: function( $state, model ) { return false; }
      }
    },
    defaultOrder: {
      column: 'user_full_name',
      reverse: false
    }
  } );

  module.addInputGroup( '', {
    supervisor_user_id: {
      column: 'applicant.supervisor_user_id',
      title: 'Supervisor',
      type: 'lookup-typeahead',
      typeahead: {
        table: 'user',
        select: 'CONCAT( user.first_name, " ", user.last_name, " (", user.name, ")" )',
        where: [ 'user.first_name', 'user.last_name', 'user.name' ]
      }
    },
    user_id: {
      column: 'applicant.user_id',
      title: 'Trainee',
      type: 'lookup-typeahead',
      typeahead: {
        table: 'user',
        select: 'CONCAT( user.first_name, " ", user.last_name, " (", user.name, ")" )',
        where: [ 'user.first_name', 'user.last_name', 'user.name' ],
        forceEmptyOnNew: true // otherwise the parent supervisor's name will populate when adding
      }
    }
  } );

  /* ######################################################################################################## */
  cenozo.providers.directive( 'cnApplicantAdd', [
    'CnApplicantModelFactory',
    function( CnApplicantModelFactory ) {
      return {
        templateUrl: module.getFileUrl( 'add.tpl.html' ),
        restrict: 'E',
        scope: { model: '=?' },
        controller: function( $scope ) {
          if( angular.isUndefined( $scope.model ) ) $scope.model = CnApplicantModelFactory.root;
        }
      };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.directive( 'cnApplicantList', [
    'CnApplicantModelFactory',
    function( CnApplicantModelFactory ) {
      return {
        templateUrl: module.getFileUrl( 'list.tpl.html' ),
        restrict: 'E',
        scope: { model: '=?' },
        controller: function( $scope ) {
          if( angular.isUndefined( $scope.model ) ) $scope.model = CnApplicantModelFactory.root;
        }
      };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnApplicantAddFactory', [
    'CnBaseAddFactory',
    function( CnBaseAddFactory ) {
      var object = function( parentModel ) { CnBaseAddFactory.construct( this, parentModel ); };
      return { instance: function( parentModel ) { return new object( parentModel ); } };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnApplicantListFactory', [
    'CnBaseListFactory', '$state',
    function( CnBaseListFactory, $state ) {
      var object = function( parentModel ) {
        var self = this;
        CnBaseListFactory.construct( this, parentModel );
        this.onSelect = function( record ) {
          $state.go( 'user.view', { identifier: 'name=' + record.user_name } );
        };
      };
      return { instance: function( parentModel ) { return new object( parentModel ); } };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnApplicantModelFactory', [
    'CnBaseModelFactory', 'CnApplicantAddFactory', 'CnApplicantListFactory',
    function( CnBaseModelFactory, CnApplicantAddFactory, CnApplicantListFactory ) {
      var object = function( root ) {
        var self = this;
        CnBaseModelFactory.construct( this, module );
        this.addModel = CnApplicantAddFactory.instance( this );
        this.listModel = CnApplicantListFactory.instance( this );
        this.getViewEnabled = function() { return true; };
      };

      return {
        root: new object( true ),
        instance: function() { return new object( false ); }
      };
    }
  ] );

} );
