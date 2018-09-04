define( function() {
  'use strict';

  try { var module = cenozoApp.module( 'final_report', true ); } catch( err ) { console.warn( err ); return; }
  angular.extend( module, {
    identifier: {
      parent: {
        subject: 'reqn',
        column: 'reqn.identifier'
      }
    },
    name: {
      singular: 'final report',
      plural: 'final reports',
      possessive: 'final report\'s'
    },
    columnList: {
      identifier: { column: 'reqn.identifier', title: 'Requisition' },
      date: { title: 'Date', type: 'date' }
    },
    defaultOrder: {
      column: 'final_report.date',
      reverse: true
    }
  } );

  module.addInputGroup( '', {
    identifier: {
      column: 'reqn.identifier',
      title: 'Identifier',
      type: 'string'
    },
    date: {
      title: 'Date',
      type: 'date'
    },

    // the following are for the form and will not appear in the view
    language: { column: 'language.code', type: 'string', exclude: true },
    thesis_title: { type: 'string', exclude: true },
    thesis_status: { type: 'string', exclude: true },
    activities: { type: 'text', exclude: true },
    findings: { type: 'text', exclude: true },
    outcomes: { type: 'text', exclude: true },
    waiver: { column: 'reqn.waiver', type: 'string', exclude: true }
  } );

  /* ######################################################################################################## */
  cenozo.providers.directive( 'cnFinalReportForm', [
    'CnFinalReportModelFactory', 'cnRecordViewDirective', 'CnReqnModelFactory', 'CnSession',
    function( CnFinalReportModelFactory, cnRecordViewDirective, CnReqnModelFactory, CnSession ) {
      // used to piggy-back on the basic view controller's functionality (but not used in the DOM)
      var cnRecordView = cnRecordViewDirective[0];
      var reqnModel = CnReqnModelFactory.instance();

      return {
        templateUrl: module.getFileUrl( 'form.tpl.html' ),
        restrict: 'E',
        scope: { model: '=?' },
        link: function( scope, element, attrs ) {
          cnRecordView.link( scope, element, attrs );

          scope.model.viewModel.afterView( function() {
            // setup the breadcrumbtrail
            CnSession.setBreadcrumbTrail(
              [ {
                title: reqnModel.module.name.plural.ucWords(),
                go: function() { reqnModel.transitionToListState(); }
              }, {
                title: scope.model.viewModel.record.identifier,
                go: function() {
                  reqnModel.transitionToViewState( {
                    getIdentifier: function() { return 'identifier=' + scope.model.viewModel.record.identifier; }
                  } );
                }
              }, {
                title: scope.model.module.name.singular.ucWords(),
                go: function() { scope.model.transitionToViewState( scope.model.viewModel.record ); }
              } ]
            );
          } );
        },
        controller: function( $scope ) {
          if( angular.isUndefined( $scope.model ) ) $scope.model = CnFinalReportModelFactory.root;
          cnRecordView.controller[1]( $scope );
          $scope.t = function( value ) { return cenozoApp.translate( 'finalReport', value, $scope.model.viewModel.record.language ); };
        }
      };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.directive( 'cnFinalReportList', [
    'CnFinalReportModelFactory',
    function( CnFinalReportModelFactory ) {
      return {
        templateUrl: module.getFileUrl( 'list.tpl.html' ),
        restrict: 'E',
        scope: { model: '=?' },
        controller: function( $scope ) {
          if( angular.isUndefined( $scope.model ) ) $scope.model = CnFinalReportModelFactory.root;
        }
      };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.directive( 'cnFinalReportView', [
    'CnFinalReportModelFactory',
    function( CnFinalReportModelFactory ) {
      return {
        templateUrl: module.getFileUrl( 'view.tpl.html' ),
        restrict: 'E',
        scope: { model: '=?' },
        controller: function( $scope ) {
          if( angular.isUndefined( $scope.model ) ) $scope.model = CnFinalReportModelFactory.root;
        }
      };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnFinalReportListFactory', [
    'CnBaseListFactory',
    function( CnBaseListFactory ) {
      var object = function( parentModel ) { CnBaseListFactory.construct( this, parentModel ); };
      return { instance: function( parentModel ) { return new object( parentModel ); } };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnFinalReportViewFactory', [
    'CnBaseViewFactory', 'CnHttpFactory',
    function( CnBaseViewFactory, CnHttpFactory ) {
      var object = function( parentModel, root ) {
        var self = this;
        CnBaseViewFactory.construct( this, parentModel, root );

        angular.extend( this, {
          // setup language and tab state parameters
          toggleLanguage: function() {
            this.record.language = 'en' == this.record.language ? 'fr' : 'en';
            return CnHttpFactory.instance( {
              path: 'reqn/identifier=' + this.record.identifier,
              data: { language: this.record.language }
            } ).patch();
          },

          tab: '',
          tabSectionList: ['instructions','part1','part2','part3'],
          setTab: function( tab, transition ) {
            if( angular.isUndefined( transition ) ) transition = true;
            if( 0 > this.tabSectionList.indexOf( tab ) ) tab = 'instructions';
            this.tab = tab;
            this.parentModel.setQueryParameter( 't', tab );
            if( transition ) this.parentModel.reloadState( false, false, 'replace' );

            // update all textarea sizes
            angular.element( 'textarea[cn-elastic]' ).trigger( 'elastic' );
          },

          nextSection: function( reverse ) {
            if( angular.isUndefined( reverse ) ) reverse = false;

            var currentTabSectionIndex = this.tabSectionList.indexOf( this.tab );
            if( null != currentTabSectionIndex ) {
              var tabSection = this.tabSectionList[currentTabSectionIndex + (reverse?-1:1)];
              if( angular.isDefined( tabSection ) ) this.setTab( tabSection );
            }
          }
        } );

        this.setTab( this.parentModel.getQueryParameter( 't' ), false );
      };
      return { instance: function( parentModel, root ) { return new object( parentModel, root ); } };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnFinalReportModelFactory', [
    'CnBaseModelFactory', 'CnFinalReportListFactory', 'CnFinalReportViewFactory',
    'CnHttpFactory', '$state',
    function( CnBaseModelFactory, CnFinalReportListFactory, CnFinalReportViewFactory,
              CnHttpFactory, $state ) {
      var object = function( root ) {
        var self = this;
        CnBaseModelFactory.construct( this, module );
        this.listModel = CnFinalReportListFactory.instance( this );
        this.viewModel = CnFinalReportViewFactory.instance( this, root );

        // override transitionToAddState
        this.transitionToAddState = function() {
          // immediately get a new reqn and view it (no add state required)
          return CnHttpFactory.instance( {
            path: 'final_report',
            data: { reqn_id: $state.params.identifier } // when adding the current id is always a req'n
          } ).post().then( function ( response ) {
            // immediately view the new reqn
            return self.transitionToViewState( { getIdentifier: function() { return response.data; } } );
          } )
        };
      };

      return {
        root: new object( true ),
        instance: function() { return new object( false ); }
      };
    }
  ] );

} );
