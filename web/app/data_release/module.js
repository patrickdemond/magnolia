define( function() {
  'use strict';

  try { var module = cenozoApp.module( 'data_release', true ); } catch( err ) { console.warn( err ); return; }
  angular.extend( module, {
    identifier: {
      parent: {
        subject: 'reqn',
        column: 'reqn.identifier'
      }
    },
    name: {
      singular: 'data version',
      plural: 'data versions',
      possessive: 'data version\'s'
    },
    columnList: {
      identifier: { title: 'Identifier', column: 'reqn.identifier' },
      data_version: { title: 'Version', column: 'data_version.name' },
      category: { title: 'Category' },
      date: { title: 'Date', type: 'date' }
    },
    defaultOrder: {
      column: 'data_release.date',
      reverse: true
    }
  } );

  module.addInputGroup( '', {
    identifier: {
      title: 'Identifier',
      column: 'reqn.identifier',
      type: 'lookup-typeahead',
      typeahead: {
        table: 'reqn',
        select: 'reqn.identifier',
        where: 'reqn.identifier'
      }
    },
    data_version_id: {
      title: 'Version',
      type: 'enum'
    },
    category: {
      title: 'Category',
      type: 'enum'
    },
    date: {
      title: 'Date',
      type: 'date'
    }
  } );

  /* ######################################################################################################## */
  cenozo.providers.directive( 'cnDataReleaseAdd', [
    'CnDataReleaseModelFactory',
    function( CnDataReleaseModelFactory ) {
      return {
        templateUrl: module.getFileUrl( 'add.tpl.html' ),
        restrict: 'E',
        scope: { model: '=?' },
        controller: function( $scope ) {
          if( angular.isUndefined( $scope.model ) ) $scope.model = CnDataReleaseModelFactory.root;
        }
      };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.directive( 'cnDataReleaseList', [
    'CnDataReleaseModelFactory',
    function( CnDataReleaseModelFactory ) {
      return {
        templateUrl: module.getFileUrl( 'list.tpl.html' ),
        restrict: 'E',
        scope: { model: '=?' },
        controller: function( $scope ) {
          if( angular.isUndefined( $scope.model ) ) $scope.model = CnDataReleaseModelFactory.root;
        }
      };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.directive( 'cnDataReleaseView', [
    'CnDataReleaseModelFactory',
    function( CnDataReleaseModelFactory ) {
      return {
        templateUrl: module.getFileUrl( 'view.tpl.html' ),
        restrict: 'E',
        scope: { model: '=?' },
        controller: function( $scope ) {
          if( angular.isUndefined( $scope.model ) ) $scope.model = CnDataReleaseModelFactory.root;
        }
      };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnDataReleaseAddFactory', [
    'CnBaseAddFactory',
    function( CnBaseAddFactory ) {
      var object = function( parentModel ) { CnBaseAddFactory.construct( this, parentModel ); };
      return { instance: function( parentModel ) { return new object( parentModel ); } };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnDataReleaseListFactory', [
    'CnBaseListFactory',
    function( CnBaseListFactory ) {
      var object = function( parentModel ) { CnBaseListFactory.construct( this, parentModel ); };
      return { instance: function( parentModel ) { return new object( parentModel ); } };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnDataReleaseViewFactory', [
    'CnBaseViewFactory',
    function( CnBaseViewFactory ) {
      var object = function( parentModel, root ) { CnBaseViewFactory.construct( this, parentModel, root ); }
      return { instance: function( parentModel, root ) { return new object( parentModel, root ); } };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnDataReleaseModelFactory', [
    'CnBaseModelFactory', 'CnDataReleaseAddFactory', 'CnDataReleaseListFactory', 'CnDataReleaseViewFactory',
    'CnHttpFactory',
    function( CnBaseModelFactory, CnDataReleaseAddFactory, CnDataReleaseListFactory, CnDataReleaseViewFactory,
              CnHttpFactory ) {
      var object = function( root ) {
        var self = this;
        CnBaseModelFactory.construct( this, module );
        this.addModel = CnDataReleaseAddFactory.instance( this );
        this.listModel = CnDataReleaseListFactory.instance( this );
        this.viewModel = CnDataReleaseViewFactory.instance( this, root );

        // allow adding and deleting even if parent is read-only
        this.getAddEnabled = function() { return angular.isDefined( self.module.actions.add ); };
        this.getDeleteEnabled = function() { return angular.isDefined( self.module.actions.delete ); };

        this.getMetadata = function() {
          return self.$$getMetadata().then( function() {
            return CnHttpFactory.instance( {
              path: 'data_version',
              data: {
                select: { column: [ 'id', 'name' ] },
                modifier: { order: 'name', limit: 1000 }
              }
            } ).query().then( function success( response ) {
              self.metadata.columnList.data_version_id.enumList = [];
              response.data.forEach( function( item ) {
                self.metadata.columnList.data_version_id.enumList.push( {
                  value: item.id,
                  name: item.name
                } );
              } );
            } )
          } );
        };
      };

      return {
        root: new object( true ),
        instance: function() { return new object( false ); }
      };
    }
  ] );

} );
