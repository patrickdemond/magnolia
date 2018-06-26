define( function() {
  'use strict';

  try { var module = cenozoApp.module( 'dsac_review', true ); } catch( err ) { console.warn( err ); return; }
  angular.extend( module, {
    identifier: {
      parent: {
        subject: 'reqn',
        column: 'reqn.identifier'
      }
    },
    name: {
      singular: 'DSAC review',
      plural: 'DSAC reviews',
      possessive: 'DSAC review\'s'
    },
    columnList: {
      note: { title: 'Note', type: 'text', limit: 1000, align: 'left' }
    },
    defaultOrder: {
      column: 'datetime',
      reverse: false
    }
  } );

  module.addInputGroup( '', {
    note: { title: 'Note', type: 'text' }
  } );

  /* ######################################################################################################## */
  cenozo.providers.directive( 'cnDsacReviewAdd', [
    'CnDsacReviewModelFactory',
    function( CnDsacReviewModelFactory ) {
      return {
        templateUrl: module.getFileUrl( 'add.tpl.html' ),
        restrict: 'E',
        scope: { model: '=?' },
        controller: function( $scope ) {
          if( angular.isUndefined( $scope.model ) ) $scope.model = CnDsacReviewModelFactory.root;
        }
      };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.directive( 'cnDsacReviewList', [
    'CnDsacReviewModelFactory',
    function( CnDsacReviewModelFactory ) {
      return {
        templateUrl: module.getFileUrl( 'list.tpl.html' ),
        restrict: 'E',
        scope: { model: '=?' },
        controller: function( $scope ) {
          if( angular.isUndefined( $scope.model ) ) $scope.model = CnDsacReviewModelFactory.root;
        }
      };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.directive( 'cnDsacReviewView', [
    'CnDsacReviewModelFactory',
    function( CnDsacReviewModelFactory ) {
      return {
        templateUrl: module.getFileUrl( 'view.tpl.html' ),
        restrict: 'E',
        scope: { model: '=?' },
        controller: function( $scope ) {
          if( angular.isUndefined( $scope.model ) ) $scope.model = CnDsacReviewModelFactory.root;
        }
      };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnDsacReviewAddFactory', [
    'CnBaseAddFactory',
    function( CnBaseAddFactory ) {
      var object = function( parentModel ) { CnBaseAddFactory.construct( this, parentModel ); };
      return { instance: function( parentModel ) { return new object( parentModel ); } };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnDsacReviewListFactory', [
    'CnBaseListFactory',
    function( CnBaseListFactory ) {
      var object = function( parentModel ) { CnBaseListFactory.construct( this, parentModel ); };
      return { instance: function( parentModel ) { return new object( parentModel ); } };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnDsacReviewViewFactory', [
    'CnBaseViewFactory',
    function( CnBaseViewFactory ) {
      var object = function( parentModel, root ) { CnBaseViewFactory.construct( this, parentModel, root ); };
      return { instance: function( parentModel, root ) { return new object( parentModel, root ); } };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnDsacReviewModelFactory', [
    'CnBaseModelFactory',
    'CnDsacReviewAddFactory', 'CnDsacReviewListFactory', 'CnDsacReviewViewFactory',
    function( CnBaseModelFactory,
              CnDsacReviewAddFactory, CnDsacReviewListFactory, CnDsacReviewViewFactory ) {
      var object = function( root ) {
        var self = this;
        CnBaseModelFactory.construct( this, module );
        this.addModel = CnDsacReviewAddFactory.instance( this );
        this.listModel = CnDsacReviewListFactory.instance( this );
        this.viewModel = CnDsacReviewViewFactory.instance( this, root );
      };

      return {
        root: new object( true ),
        instance: function() { return new object( false ); }
      };
    }
  ] );

} );
