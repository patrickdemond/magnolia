define( function() {
  'use strict';

  try { var module = cenozoApp.module( 'requisition', true ); } catch( err ) { console.warn( err ); return; }
  angular.extend( module, {
    identifier: {},
    name: {
      singular: 'requisition',
      plural: 'requisitions',
      possessive: 'requisition\'s',
      pluralPossessive: 'requisitions\''
    },
    columnList: {
      identifier: {
        title: 'Identifier'
      },
      user_full_name: {
        title: 'Applicant',
      },
      start_date: {
        title: 'Start Date',
        type: 'date'
      },
      duration: {
        title: 'Duration'
      }
    },
    defaultOrder: {
      column: 'requisition.identifier',
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
  cenozo.providers.directive( 'cnRequisitionAdd', [
    'CnRequisitionModelFactory',
    function( CnRequisitionModelFactory ) {
      return {
        templateUrl: module.getFileUrl( 'add.tpl.html' ),
        restrict: 'E',
        scope: { model: '=?' },
        controller: function( $scope ) {
          if( angular.isUndefined( $scope.model ) ) $scope.model = CnRequisitionModelFactory.root;
          $scope.tab = 'instructions';
          $scope.part1Tab = 'applicant';
          $scope.part2Tab = 'qnaire';
          $scope.ethics = '';
        }
      };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.directive( 'cnRequisitionList', [
    'CnRequisitionModelFactory',
    function( CnRequisitionModelFactory ) {
      return {
        templateUrl: module.getFileUrl( 'list.tpl.html' ),
        restrict: 'E',
        scope: { model: '=?' },
        controller: function( $scope ) {
          if( angular.isUndefined( $scope.model ) ) $scope.model = CnRequisitionModelFactory.root;
        }
      };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.directive( 'cnRequisitionView', [
    'CnRequisitionModelFactory',
    function( CnRequisitionModelFactory ) {
      return {
        templateUrl: module.getFileUrl( 'view.tpl.html' ),
        restrict: 'E',
        scope: { model: '=?' },
        controller: function( $scope ) {
          if( angular.isUndefined( $scope.model ) ) $scope.model = CnRequisitionModelFactory.root;
        }
      };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnRequisitionAddFactory', [
    'CnHttpFactory',
    function( CnHttpFactory ) {
      var object = function( parentModel ) {
        this.parentModel = parentModel;
      };
      return { instance: function( parentModel ) { return new object( parentModel ); } };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnRequisitionListFactory', [
    'CnBaseListFactory',
    function( CnBaseListFactory ) {
      var object = function( parentModel ) { CnBaseListFactory.construct( this, parentModel ); };
      return { instance: function( parentModel ) { return new object( parentModel ); } };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnRequisitionViewFactory', [
    'CnBaseViewFactory',
    function( CnBaseViewFactory ) {
      var object = function( parentModel, root ) { CnBaseViewFactory.construct( this, parentModel, root ); };
      return { instance: function( parentModel, root ) { return new object( parentModel, root ); } };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnRequisitionModelFactory', [
    'CnBaseModelFactory',
    'CnRequisitionAddFactory', 'CnRequisitionListFactory', 'CnRequisitionViewFactory',
    function( CnBaseModelFactory,
              CnRequisitionAddFactory, CnRequisitionListFactory, CnRequisitionViewFactory ) {
      var object = function( root ) {
        var self = this;
        CnBaseModelFactory.construct( this, module );
        this.addModel = CnRequisitionAddFactory.instance( this );
        this.listModel = CnRequisitionListFactory.instance( this );
        this.viewModel = CnRequisitionViewFactory.instance( this, root );
      };

      return {
        root: new object( true ),
        instance: function() { return new object( false ); }
      };
    }
  ] );

} );
