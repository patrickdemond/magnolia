define( function() {
  'use strict';

  try { var module = cenozoApp.module( 'pdf_form', true ); } catch( err ) { console.warn( err ); return; }
  angular.extend( module, {
    identifier: {
      parent: {
        subject: 'pdf_form_type',
        column: 'pdf_form_type.name'
      }
    },
    name: {
      singular: 'version',
      plural: 'versions',
      possessive: 'version\'s',
      friendlyColumn: 'version'
    },
    columnList: {
      version: {
        title: 'Version',
        type: 'date'
      },
      active: {
        title: 'Active',
        type: 'boolean',
        help: 'Is this the actively used version of the form?'
      }
    },
    defaultOrder: {
      column: 'version',
      reverse: true
    }
  } );

  module.addInputGroup( '', {
    version: {
      title: 'Version',
      type: 'date'
    },
    active: {
      title: 'Active',
      type: 'boolean',
      help: 'Determines whether this is the actively used version of the form (only one version may be active)'
    },
    filename: {
      title: 'File',
      type: 'file'
    }
  } );

  /* ######################################################################################################## */
  cenozo.providers.directive( 'cnPdfFormAdd', [
    'CnPdfFormModelFactory',
    function( CnPdfFormModelFactory ) {
      return {
        templateUrl: module.getFileUrl( 'add.tpl.html' ),
        restrict: 'E',
        scope: { model: '=?' },
        controller: function( $scope ) {
          if( angular.isUndefined( $scope.model ) ) $scope.model = CnPdfFormModelFactory.root;
        }
      };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.directive( 'cnPdfFormList', [
    'CnPdfFormModelFactory',
    function( CnPdfFormModelFactory ) {
      return {
        templateUrl: module.getFileUrl( 'list.tpl.html' ),
        restrict: 'E',
        scope: { model: '=?' },
        controller: function( $scope ) {
          if( angular.isUndefined( $scope.model ) ) $scope.model = CnPdfFormModelFactory.root;
        }
      };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.directive( 'cnPdfFormView', [
    'CnPdfFormModelFactory',
    function( CnPdfFormModelFactory ) {
      return {
        templateUrl: module.getFileUrl( 'view.tpl.html' ),
        restrict: 'E',
        scope: { model: '=?' },
        controller: function( $scope ) {
          if( angular.isUndefined( $scope.model ) ) $scope.model = CnPdfFormModelFactory.root;
        }
      };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnPdfFormAddFactory', [
    'CnBaseAddFactory',
    function( CnBaseAddFactory ) {
      var object = function( parentModel ) {
        CnBaseAddFactory.construct( this, parentModel );
        this.configureFileInput( 'filename', 'pdf' );
      };
      return { instance: function( parentModel ) { return new object( parentModel ); } };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnPdfFormListFactory', [
    'CnBaseListFactory',
    function( CnBaseListFactory ) {
      var object = function( parentModel ) { CnBaseListFactory.construct( this, parentModel ); };
      return { instance: function( parentModel ) { return new object( parentModel ); } };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnPdfFormViewFactory', [
    'CnBaseViewFactory', 'CnHttpFactory',
    function( CnBaseViewFactory, CnHttpFactory ) {
      var object = function( parentModel, root ) {
        var self = this;
        CnBaseViewFactory.construct( this, parentModel, root );
        this.configureFileInput( 'filename', 'pdf' );

        this.afterView( function() {
          if( angular.isUndefined( self.downloadFile ) ) {
            self.downloadFile = function() {
              return CnHttpFactory.instance( {
                path: self.parentModel.getServiceResourcePath(),
                format: 'pdf'
              } ).file();
            };
          }
        } );
      }
      return { instance: function( parentModel, root ) { return new object( parentModel, root ); } };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnPdfFormModelFactory', [
    'CnBaseModelFactory', 'CnPdfFormAddFactory', 'CnPdfFormListFactory', 'CnPdfFormViewFactory', '$state',
    function( CnBaseModelFactory, CnPdfFormAddFactory, CnPdfFormListFactory, CnPdfFormViewFactory, $state ) {
      var object = function( root ) {
        CnBaseModelFactory.construct( this, module );
        this.addModel = CnPdfFormAddFactory.instance( this );
        this.listModel = CnPdfFormListFactory.instance( this );
        this.viewModel = CnPdfFormViewFactory.instance( this );
      };

      return {
        root: new object( true ),
        instance: function() { return new object( false ); }
      };
    }
  ] );

} );
