define( function() {
  'use strict';

  try { var module = cenozoApp.module( 'reference', true ); } catch( err ) { console.warn( err ); return; }
  angular.extend( module, {
    identifier: {},
    name: {
      singular: 'reference',
      plural: 'references',
      possessive: 'reference\'s',
      pluralPossessive: 'references\''
    },
    columnList: {
      user: {
        title: 'Applicant',
        name: 'user.full_name'
      },
      identifier: {
        title: 'Name'
      }
    },
    defaultOrder: {
      column: 'reference.name',
      reverse: false
    }
  } );

  module.addInputGroup( '', {
    name: {
      title: 'Applicant',
      type: 'lookup-typeahead',
      typeahead: {
        table: 'user',
        select: 'CONCAT( user.first_name, " ", user.last_name, " (", user.name, ")" )',
        where: [ 'user.first_name', 'user.last_name', 'user.name' ]
      }
    },
    identifier: {
      title: 'Identifier',
      type: 'string'
    }
  } );

  /* ######################################################################################################## */
  cenozo.providers.directive( 'cnReferenceAdd', [
    'CnReferenceModelFactory',
    function( CnReferenceModelFactory ) {
      return {
        templateUrl: module.getFileUrl( 'add.tpl.html' ),
        restrict: 'E',
        scope: { model: '=?' },
        controller: function( $scope ) {
          if( angular.isUndefined( $scope.model ) ) $scope.model = CnReferenceModelFactory.root;
        }
      };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.directive( 'cnReferenceList', [
    'CnReferenceModelFactory',
    function( CnReferenceModelFactory ) {
      return {
        templateUrl: module.getFileUrl( 'list.tpl.html' ),
        restrict: 'E',
        scope: { model: '=?' },
        controller: function( $scope ) {
          if( angular.isUndefined( $scope.model ) ) $scope.model = CnReferenceModelFactory.root;
        }
      };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.directive( 'cnReferenceView', [
    'CnReferenceModelFactory',
    function( CnReferenceModelFactory ) {
      return {
        templateUrl: module.getFileUrl( 'view.tpl.html' ),
        restrict: 'E',
        scope: { model: '=?' },
        controller: function( $scope ) {
          if( angular.isUndefined( $scope.model ) ) $scope.model = CnReferenceModelFactory.root;
        }
      };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnReferenceAddFactory', [
    'CnBaseAddFactory',
    function( CnBaseAddFactory ) {
      var object = function( parentModel ) { CnBaseAddFactory.construct( this, parentModel ); };
      return { instance: function( parentModel ) { return new object( parentModel ); } };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnReferenceListFactory', [
    'CnBaseListFactory',
    function( CnBaseListFactory ) {
      var object = function( parentModel ) { CnBaseListFactory.construct( this, parentModel ); };
      return { instance: function( parentModel ) { return new object( parentModel ); } };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnReferenceViewFactory', [
    'CnBaseViewFactory',
    function( CnBaseViewFactory ) {
      var object = function( parentModel, root ) { CnBaseViewFactory.construct( this, parentModel, root ); };
      return { instance: function( parentModel, root ) { return new object( parentModel, root ); } };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnReferenceModelFactory', [
    'CnBaseModelFactory',
    'CnReferenceAddFactory', 'CnReferenceListFactory', 'CnReferenceViewFactory',
    function( CnBaseModelFactory,
              CnReferenceAddFactory, CnReferenceListFactory, CnReferenceViewFactory ) {
      var object = function( root ) {
        var self = this;
        CnBaseModelFactory.construct( this, module );
        this.addModel = CnReferenceAddFactory.instance( this );
        this.listModel = CnReferenceListFactory.instance( this );
        this.viewModel = CnReferenceViewFactory.instance( this, root );
      };

      return {
        root: new object( true ),
        instance: function() { return new object( false ); }
      };
    }
  ] );

} );