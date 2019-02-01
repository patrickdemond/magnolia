define( function() {
  'use strict';

  try { var module = cenozoApp.module( 'graduate', true ); } catch( err ) { console.warn( err ); return; }
  angular.extend( module, {
    identifier: {},
    name: {
      singular: 'trainee',
      plural: 'trainees',
      possessive: 'trainee\'s'
    },
    columnList: {
      user_full_name: {
        title: 'Supervisor',
        isIncluded: function( $state, model ) { return 'graduate.list' == $state.current.name; }
      },
      graduate_full_name: {
        title: 'Trainee'
      },
      graduate_name: {
        column: 'graduate_user.name',
        isIncluded: function( $state, model ) { return false; }
      }
    },
    defaultOrder: {
      column: 'graduate_full_name',
      reverse: false
    }
  } );

  module.addInputGroup( '', {
    user_id: {
      column: 'graduate.user_id',
      title: 'Supervisor',
      type: 'lookup-typeahead',
      typeahead: {
        table: 'user',
        select: 'CONCAT( user.first_name, " ", user.last_name, " (", user.name, ")" )',
        where: [ 'user.first_name', 'user.last_name', 'user.name' ]
      }
    },
    graduate_user_id: {
      column: 'graduate.graduate_user_id',
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
  cenozo.providers.directive( 'cnGraduateAdd', [
    'CnGraduateModelFactory',
    function( CnGraduateModelFactory ) {
      return {
        templateUrl: module.getFileUrl( 'add.tpl.html' ),
        restrict: 'E',
        scope: { model: '=?' },
        controller: function( $scope ) {
          if( angular.isUndefined( $scope.model ) ) $scope.model = CnGraduateModelFactory.root;
        }
      };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.directive( 'cnGraduateList', [
    'CnGraduateModelFactory',
    function( CnGraduateModelFactory ) {
      return {
        templateUrl: module.getFileUrl( 'list.tpl.html' ),
        restrict: 'E',
        scope: { model: '=?' },
        controller: function( $scope ) {
          if( angular.isUndefined( $scope.model ) ) $scope.model = CnGraduateModelFactory.root;
        }
      };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnGraduateAddFactory', [
    'CnBaseAddFactory',
    function( CnBaseAddFactory ) {
      var object = function( parentModel ) { CnBaseAddFactory.construct( this, parentModel ); };
      return { instance: function( parentModel ) { return new object( parentModel ); } };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnGraduateListFactory', [
    'CnBaseListFactory', '$state',
    function( CnBaseListFactory, $state ) {
      var object = function( parentModel ) {
        var self = this;
        CnBaseListFactory.construct( this, parentModel );
        this.onSelect = function( record ) {
          $state.go( 'user.view', { identifier: 'name=' + record.graduate_name } );
        };
      };
      return { instance: function( parentModel ) { return new object( parentModel ); } };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnGraduateModelFactory', [
    'CnBaseModelFactory', 'CnGraduateAddFactory', 'CnGraduateListFactory',
    function( CnBaseModelFactory, CnGraduateAddFactory, CnGraduateListFactory ) {
      var object = function( root ) {
        var self = this;
        CnBaseModelFactory.construct( this, module );
        this.addModel = CnGraduateAddFactory.instance( this );
        this.listModel = CnGraduateListFactory.instance( this );
        this.getViewEnabled = function() { return true; };
      };

      return {
        root: new object( true ),
        instance: function() { return new object( false ); }
      };
    }
  ] );

} );