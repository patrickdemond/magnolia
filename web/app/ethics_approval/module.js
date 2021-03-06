define( function() {
  'use strict';

  try { var module = cenozoApp.module( 'ethics_approval', true ); } catch( err ) { console.warn( err ); return; }
  angular.extend( module, {
    identifier: {
      parent: {
        subject: 'reqn',
        column: 'reqn.identifier'
      }
    },
    name: {
      singular: 'ethics approval',
      plural: 'ethics approvals',
      possessive: 'ethics approval\'s'
    },
    columnList: {
      identifier: { column: 'reqn.identifier', title: 'Requisition' },
      filename: { title: 'File' },
      date: { title: 'Expiry' }
    },
    defaultOrder: {
      column: 'ethics_approval.date',
      reverse: true
    }
  } );

  module.addInputGroup( '', {
    filename: {
      title: 'File',
      type: 'file'
    },
    date: {
      title: 'Expiry',
      type: 'date'
    }
  } );

  /* ######################################################################################################## */
  cenozo.providers.directive( 'cnEthicsApprovalAdd', [
    'CnEthicsApprovalModelFactory',
    function( CnEthicsApprovalModelFactory ) {
      return {
        templateUrl: module.getFileUrl( 'add.tpl.html' ),
        restrict: 'E',
        scope: { model: '=?' },
        controller: function( $scope ) {
          if( angular.isUndefined( $scope.model ) ) $scope.model = CnEthicsApprovalModelFactory.root;
        }
      };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.directive( 'cnEthicsApprovalList', [
    'CnEthicsApprovalModelFactory',
    function( CnEthicsApprovalModelFactory ) {
      return {
        templateUrl: module.getFileUrl( 'list.tpl.html' ),
        restrict: 'E',
        scope: { model: '=?' },
        controller: function( $scope ) {
          if( angular.isUndefined( $scope.model ) ) $scope.model = CnEthicsApprovalModelFactory.root;
        }
      };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.directive( 'cnEthicsApprovalView', [
    'CnEthicsApprovalModelFactory',
    function( CnEthicsApprovalModelFactory ) {
      return {
        templateUrl: module.getFileUrl( 'view.tpl.html' ),
        restrict: 'E',
        scope: { model: '=?' },
        controller: function( $scope ) {
          if( angular.isUndefined( $scope.model ) ) $scope.model = CnEthicsApprovalModelFactory.root;
        }
      };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnEthicsApprovalAddFactory', [
    'CnBaseAddFactory',
    function( CnBaseAddFactory ) {
      var object = function( parentModel ) {
        CnBaseAddFactory.construct( this, parentModel );
        this.configureFileInput( 'filename' );
      };
      return { instance: function( parentModel ) { return new object( parentModel ); } };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnEthicsApprovalListFactory', [
    'CnBaseListFactory',
    function( CnBaseListFactory ) {
      var object = function( parentModel ) { CnBaseListFactory.construct( this, parentModel ); };
      return { instance: function( parentModel ) { return new object( parentModel ); } };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnEthicsApprovalViewFactory', [
    'CnBaseViewFactory', 'CnReqnHelper', 'CnHttpFactory', 'CnSession',
    function( CnBaseViewFactory, CnReqnHelper, CnHttpFactory, CnSession ) {
      var object = function( parentModel, root ) {
        CnBaseViewFactory.construct( this, parentModel, root );
        this.configureFileInput( 'filename' );
      };
      return { instance: function( parentModel, root ) { return new object( parentModel, root ); } };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.service( 'CnEthicsApprovalModalAddFactory', [
    'CnHttpFactory', 'CnReqnHelper', 'CnModalDatetimeFactory', '$uibModal',
    function( CnHttpFactory, CnReqnHelper, CnModalDatetimeFactory, $uibModal ) {
      var object = function( params ) {
        var self = this;
        this.language = 'en';
        angular.extend( this, params );

        this.show = function() {
          return $uibModal.open( {
            backdrop: 'static',
            keyboard: true,
            modalFade: true,
            templateUrl: module.getFileUrl( 'modal-add.tpl.html' ),
            controller: [ '$scope', '$uibModalInstance', function( $scope, $uibModalInstance ) {
              angular.extend( $scope, {
                file: {
                  key: 'filename',
                  file: null,
                  uploading: false,
                  getFilename: function() {
                    var obj = this;
                    var data = new FormData();
                    data.append( 'file', obj.file );
                    var fileDetails = data.get( 'file' );
                    return fileDetails.name;
                  },
                  upload: function( path ) {
                    var obj = this;
                    obj.uploading = true;

                    // upload the file
                    return CnHttpFactory.instance( {
                      path: path + '?file=filename',
                      data: obj.file,
                      format: 'unknown'
                    } ).patch().finally( function() { obj.uploading = false; } );
                  }
                },
                filename: null,
                date: null,
                selectDate: function() {
                  CnModalDatetimeFactory.instance( {
                    title: $scope.t( 'misc.expirationDate' ).toLowerCase(),
                    date: self.date,
                    pickerType: 'date',
                    emptyAllowed: false,
                    locale: self.language
                  } ).show().then( function( response ) {
                    if( response ) $scope.date = response.replace( /T.*/, '' );
                  } );
                },
                t: function( value ) { return CnReqnHelper.translate( 'reqn', value, self.language ); },
                ok: function() {
                  $uibModalInstance.close( { file: $scope.file, date: $scope.date } );
                },
                cancel: function() { $uibModalInstance.close( false ); }
              } );
            } ]
          } ).result;
        };
      };

      return { instance: function( params ) { return new object( angular.isUndefined( params ) ? {} : params ); } };
    }
  ] );


  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnEthicsApprovalModelFactory', [
    'CnBaseModelFactory', 'CnEthicsApprovalAddFactory', 'CnEthicsApprovalListFactory', 'CnEthicsApprovalViewFactory',
    'CnSession', 'CnHttpFactory',
    function( CnBaseModelFactory, CnEthicsApprovalAddFactory, CnEthicsApprovalListFactory, CnEthicsApprovalViewFactory,
              CnSession, CnHttpFactory ) {
      var object = function( root ) {
        var self = this;
        CnBaseModelFactory.construct( this, module );
        this.addModel = CnEthicsApprovalAddFactory.instance( this );
        this.listModel = CnEthicsApprovalListFactory.instance( this );
        this.viewModel = CnEthicsApprovalViewFactory.instance( this, root );
      };

      return {
        root: new object( true ),
        instance: function() { return new object( false ); }
      };
    }
  ] );

} );
