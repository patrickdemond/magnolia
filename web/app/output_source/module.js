define( function() {
  'use strict';

  try { var module = cenozoApp.module( 'output_source', true ); } catch( err ) { console.warn( err ); return; }
  angular.extend( module, {
    identifier: {
      parent: {
        subject: 'output',
        column: 'output.id',
        friendly: 'detail'
      }
    },
    name: {
      singular: 'source',
      plural: 'sources',
      possessive: 'source\'s'
    },
    columnList: {
      filename: { title: '' }, // defined by directives at run-time
      url: { title: '' } // defined by directives at run-time
    },
    defaultOrder: {
      column: 'output_source.id',
      reverse: false
    }
  } );

  module.addInputGroup( '', {
    filename: {
      title: '', // defined below
      type: 'file'
    },
    url: {
      title: '', // defined below
      type: 'string'
    },
    detail: {
      column: 'output.detail',
      isExcluded: true
    },
    lang: { column: 'language.code', type: 'string', isExcluded: true }
  } );

  /* ######################################################################################################## */
  cenozo.providers.directive( 'cnOutputSourceAdd', [
    'CnOutputSourceModelFactory', 'CnModalMessageFactory', 'CnHttpFactory', 'CnReqnHelper', '$q',
    function( CnOutputSourceModelFactory, CnModalMessageFactory, CnHttpFactory, CnReqnHelper, $q ) {
      return {
        templateUrl: module.getFileUrl( 'add.tpl.html' ),
        restrict: 'E',
        scope: { model: '=?' },
        controller: function( $scope ) {
          if( angular.isUndefined( $scope.model ) ) $scope.model = CnOutputSourceModelFactory.root;

          // get the child cn-record-add's scope
          $scope.$on( 'cnRecordAdd ready', function( event, data ) {
            var cnRecordAddScope = data;
            var parent = $scope.model.getParentIdentifier();
            var origin = $scope.model.getQueryParameter( 'origin', true );
            var promiseList = [];
            var len = promiseList.length;
            if( 'final_report' == origin ) {
              promiseList.push( CnHttpFactory.instance( {
                path: 'output/' + parent.identifier,
                data: { select: { column: { table: 'language', column: 'code', alias: 'lang' } } }
              } ).get().then( response => response.data.lang ) );
            }

            $q.all( promiseList ).then( function( response ) {
              var lang = len == response.length ? 'en' : response[len];
              var saveFn = cnRecordAddScope.save;
              angular.extend( cnRecordAddScope, {
                getCancelText: function() { return CnReqnHelper.translate( 'output', 'cancel', lang ); },
                getSaveText: function() { return CnReqnHelper.translate( 'output', 'save', lang ); },
                save: function() {
                  if( !$scope.model.addModel.hasFile( 'filename' ) && angular.isUndefined( cnRecordAddScope.record.url ) ) {
                    CnModalMessageFactory.instance( {
                      title: CnReqnHelper.translate( 'output', 'newOutputSourceTitle', lang ),
                      message: CnReqnHelper.translate( 'output', 'newOutputSourceMessage', lang ),
                      error: true
                    } ).show();
                  } else saveFn();
                }
              } );
            } );
          } );
        }
      };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.directive( 'cnOutputSourceList', [
    'CnOutputSourceModelFactory',
    function( CnOutputSourceModelFactory ) {
      return {
        templateUrl: module.getFileUrl( 'list.tpl.html' ),
        restrict: 'E',
        scope: { model: '=?' },
        controller: function( $scope ) {
          if( angular.isUndefined( $scope.model ) ) $scope.model = CnOutputSourceModelFactory.root;
        }
      };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.directive( 'cnOutputSourceView', [
    'CnOutputSourceModelFactory', 'CnModalMessageFactory', 'CnReqnHelper',
    function( CnOutputSourceModelFactory, CnModalMessageFactory, CnReqnHelper ) {
      return {
        templateUrl: module.getFileUrl( 'view.tpl.html' ),
        restrict: 'E',
        scope: { model: '=?' },
        controller: function( $scope ) {
          if( angular.isUndefined( $scope.model ) ) $scope.model = CnOutputSourceModelFactory.root;

          // get the child cn-record-add's scope
          $scope.$on( 'cnRecordView ready', function( event, data ) {
            var cnRecordViewScope = data;
            var origin = $scope.model.getQueryParameter( 'origin', true );
            var patchFn = cnRecordViewScope.patch;
            angular.extend( cnRecordViewScope, {
              getDeleteText: function() {
                return 'final_report' == origin ?
                  CnReqnHelper.translate( 'output', 'delete', $scope.model.viewModel.record.lang ) :
                  'Delete';
              },
              getViewText: function( subject ) {
                return 'final_report' == origin ?
                  CnReqnHelper.translate( 'output', 'viewOutput', $scope.model.viewModel.record.lang ) :
                  'View ' + cnRecordViewScope.parentName( subject );
              },
              patch: function() {
                if( !$scope.model.viewModel.record.filename && !$scope.model.viewModel.record.url ) {
                  CnModalMessageFactory.instance( {
                    title: 'Please Note',
                    message: 'You must provide either a file or web link (URL)',
                    error: true
                  } ).show();

                  // undo the change
                  if( $scope.model.viewModel.record.filename != $scope.model.viewModel.backupRecord.filename ) {
                    $scope.model.viewModel.record.filename = $scope.model.viewModel.backupRecord.filename;
                    $scope.model.viewModel.formattedRecord.filename =$scope.model.viewModel.backupRecord.formatted_filename;
                  }
                  if( $scope.model.viewModel.record.url != $scope.model.viewModel.backupRecord.url )
                    $scope.model.viewModel.record.url = $scope.model.viewModel.backupRecord.url;
                } else patchFn();
              }
            } );
          } );
        }
      };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnOutputSourceAddFactory', [
    'CnBaseAddFactory', 'CnHttpFactory', 'CnReqnHelper', '$q',
    function( CnBaseAddFactory, CnHttpFactory, CnReqnHelper, $q ) {
      var object = function( parentModel ) {
        var self = this;
        CnBaseAddFactory.construct( this, parentModel );
        this.configureFileInput( 'filename' );

        this.onNew = function( record ) {
          var parent = self.parentModel.getParentIdentifier();
          var origin = self.parentModel.getQueryParameter( 'origin', true );
          var promiseList = [ self.$$onNew( record ) ];
          var len = promiseList.length;

          if( 'final_report' == origin ) {
            promiseList.push( CnHttpFactory.instance( {
              path: 'output/' + parent.identifier,
              data: { select: { column: { table: 'language', column: 'code', alias: 'lang' } } }
            } ).get().then( response => response.data.lang ) );
          }

          return $q.all( promiseList ).then( function( response ) {
            var lang = len == response.length ? 'en' : response[len];
            self.parentModel.updateLanguage( lang );
            self.heading = CnReqnHelper.translate( 'output', 'createOutputSource', lang );
          } );
        };
      };
      return { instance: function( parentModel ) { return new object( parentModel ); } };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnOutputSourceListFactory', [
    'CnBaseListFactory',
    function( CnBaseListFactory ) {
      var object = function( parentModel ) { CnBaseListFactory.construct( this, parentModel ); };
      return { instance: function( parentModel ) { return new object( parentModel ); } };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnOutputSourceViewFactory', [
    'CnBaseViewFactory', 'CnReqnHelper',
    function( CnBaseViewFactory, CnReqnHelper ) {
      var object = function( parentModel, root ) {
        var self = this;
        CnBaseViewFactory.construct( this, parentModel, root );
        this.configureFileInput( 'filename' );

        this.onView = function( force ) {
          return self.$$onView( force ).then( function() {
            var origin = self.parentModel.getQueryParameter( 'origin', true );
            var lang = 'final_report' == origin ? self.record.lang : 'en';
            self.parentModel.updateLanguage( lang );
            self.heading = CnReqnHelper.translate( 'output', 'outputSourceDetails', lang );
          } );
        };
      }
      return { instance: function( parentModel, root ) { return new object( parentModel, root ); } };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnOutputSourceModelFactory', [
    'CnBaseModelFactory', 'CnOutputSourceAddFactory', 'CnOutputSourceListFactory', 'CnOutputSourceViewFactory',
    'CnSession', 'CnReqnHelper', '$state',
    function( CnBaseModelFactory, CnOutputSourceAddFactory, CnOutputSourceListFactory, CnOutputSourceViewFactory,
              CnSession, CnReqnHelper, $state ) {
      var object = function( root ) {
        var self = this;
        CnBaseModelFactory.construct( this, module );
        this.addModel = CnOutputSourceAddFactory.instance( this );
        this.listModel = CnOutputSourceListFactory.instance( this );
        this.viewModel = CnOutputSourceViewFactory.instance( this, root );

        angular.extend( this, {
          updateLanguage: function( lang ) {
            var group = self.module.inputGroupList.findByProperty( 'title', '' );
            group.inputList.filename.title = CnReqnHelper.translate( 'output', 'filename', lang );
            group.inputList.url.title = CnReqnHelper.translate( 'output', 'url', lang );
          },

          setupBreadcrumbTrail: function() {
            // change the breadcrumb trail based on the origin parameter
            self.$$setupBreadcrumbTrail();
            var origin = self.getQueryParameter( 'origin', true );
            if( 'final_report' == origin ) {
              var parent = self.getParentIdentifier();
              var index = CnSession.breadcrumbTrail.findIndexByProperty( 'title', 'Output' );
              CnSession.breadcrumbTrail[index+1].go = function() {
                $state.go( 'output.view', { identifier: parent.identifier, origin: origin } );
              };
              delete CnSession.breadcrumbTrail[index].go;
            }
          },

          transitionToAddState: function() {
            var origin = self.getQueryParameter( 'origin', true );
            if( 'final_report' == origin ) {
              $state.go(
                '^.add_' + self.module.subject.snake,
                { parentIdentifier: $state.params.identifier, origin: origin }
              );
            } else self.$$transitionToAddState();
          },

          transitionToViewState: function( record ) {
            var origin = self.getQueryParameter( 'origin', true );
            if( 'final_report' == origin ) {
              $state.go(
                'output_source.view',
                { identifier: record.getIdentifier(), parentIdentifier: $state.params.identifier, origin: origin }
              );
            } else self.$$transitionToViewState( record );
          },

          transitionToLastState: function() {
            // include the origin in the parent output's state
            var stateParams = { identifier: self.getParentIdentifier().identifier };
            var origin = self.getQueryParameter( 'origin', true );
            if( angular.isDefined( origin ) ) stateParams.origin = origin;
            return $state.go( 'output.view', stateParams );
          },

          transitionToParentViewState: function( subject, identifier ) {
            // include the origin in the parent output's state
            var stateParams = { identifier: identifier };
            var origin = self.getQueryParameter( 'origin', true );
            if( angular.isDefined( origin ) ) stateParams.origin = origin;
            return $state.go( subject + '.view', stateParams );
          }
        } );
      };

      return {
        root: new object( true ),
        instance: function() { return new object( false ); }
      };
    }
  ] );

} );
