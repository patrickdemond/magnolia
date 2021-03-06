define( function() {
  'use strict';

  try { var module = cenozoApp.module( 'supplemental_file', true ); } catch( err ) { console.warn( err ); return; }
  angular.extend( module, {
    identifier: {},
    name: {
      singular: 'supplemental file',
      plural: 'supplemental files',
      possessive: 'supplemental file\'s'
    },
    columnList: { name_en: { title: 'Name' } },
    defaultOrder: { column: 'name_en', reverse: false }
  } );

  module.addInputGroup( '', {
    name_en: {
      title: 'Name (English)',
      type: 'string',
      help: 'The name of the file (in English) as it will appear along with study data.'
    },
    name_fr: {
      title: 'Name (French)',
      type: 'string',
      help: 'The name of the file (in French) as it will appear along with study data.'
    },
    filename_en: {
      title: 'File (English)',
      type: 'file',
      isExcluded: 'add'
    },
    filename_fr: {
      title: 'File (French)',
      type: 'file',
      isExcluded: 'add'
    }
  } );

  /* ######################################################################################################## */
  cenozo.providers.directive( 'cnSupplementalFileAdd', [
    'CnSupplementalFileModelFactory',
    function( CnSupplementalFileModelFactory ) {
      return {
        templateUrl: module.getFileUrl( 'add.tpl.html' ),
        restrict: 'E',
        scope: { model: '=?' },
        controller: function( $scope ) {
          if( angular.isUndefined( $scope.model ) ) $scope.model = CnSupplementalFileModelFactory.root;
        }
      };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.directive( 'cnSupplementalFileList', [
    'CnSupplementalFileModelFactory',
    function( CnSupplementalFileModelFactory ) {
      return {
        templateUrl: module.getFileUrl( 'list.tpl.html' ),
        restrict: 'E',
        scope: { model: '=?' },
        controller: function( $scope ) {
          if( angular.isUndefined( $scope.model ) ) $scope.model = CnSupplementalFileModelFactory.root;
        }
      };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.directive( 'cnSupplementalFileView', [
    'CnSupplementalFileModelFactory',
    function( CnSupplementalFileModelFactory ) {
      return {
        templateUrl: module.getFileUrl( 'view.tpl.html' ),
        restrict: 'E',
        scope: { model: '=?' },
        controller: function( $scope ) {
          if( angular.isUndefined( $scope.model ) ) $scope.model = CnSupplementalFileModelFactory.root;
        }
      };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnSupplementalFileAddFactory', [
    'CnBaseAddFactory',
    function( CnBaseAddFactory ) {
      var object = function( parentModel ) { CnBaseAddFactory.construct( this, parentModel ); };
      return { instance: function( parentModel ) { return new object( parentModel ); } };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnSupplementalFileListFactory', [
    'CnBaseListFactory',
    function( CnBaseListFactory ) {
      var object = function( parentModel ) { CnBaseListFactory.construct( this, parentModel ); };
      return { instance: function( parentModel ) { return new object( parentModel ); } };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnSupplementalFileViewFactory', [
    'CnBaseViewFactory',
    function( CnBaseViewFactory ) {
      var object = function( parentModel, root ) {
        CnBaseViewFactory.construct( this, parentModel, root );
        this.configureFileInput( 'filename_en' );
        this.configureFileInput( 'filename_fr' );
      }
      return { instance: function( parentModel, root ) { return new object( parentModel, root ); } };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnSupplementalFileModelFactory', [
    'CnBaseModelFactory', 'CnSupplementalFileAddFactory', 'CnSupplementalFileListFactory', 'CnSupplementalFileViewFactory',
    function( CnBaseModelFactory, CnSupplementalFileAddFactory, CnSupplementalFileListFactory, CnSupplementalFileViewFactory ) {
      var object = function( root ) {
        var self = this;
        CnBaseModelFactory.construct( this, module );
        this.addModel = CnSupplementalFileAddFactory.instance( this );
        this.listModel = CnSupplementalFileListFactory.instance( this );
        this.viewModel = CnSupplementalFileViewFactory.instance( this, root );
      };

      return {
        root: new object( true ),
        instance: function() { return new object( false ); }
      };
    }
  ] );

} );
