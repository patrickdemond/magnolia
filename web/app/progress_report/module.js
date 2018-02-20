define( function() {
  'use strict';

  try { var module = cenozoApp.module( 'progress_report', true ); } catch( err ) { console.warn( err ); return; }
  angular.extend( module, {
    identifier: {},
    name: {
      singular: 'progress report',
      plural: 'progress reports',
      possessive: 'progress report\'s',
      pluralPossessive: 'progress reports\''
    },
    columnList: {
      type: { title: 'Type' },
      date: { title: 'Date', type: 'date' }
    },
    defaultOrder: {
      column: 'progress_report.date',
      reverse: true
    }
  } );

  module.addInputGroup( '', {
    type: { type: 'string' },
    thesis_title: { type: 'string' },
    thesis_status: { type: 'string' },
    activities: { type: 'text' },
    findings: { type: 'text' },
    outcomes: { type: 'text' },
    date: { type: 'date' }
  } );

  /* ######################################################################################################## */
  cenozo.providers.directive( 'cnProgressReportList', [
    'CnProgressReportModelFactory',
    function( CnProgressReportModelFactory ) {
      return {
        templateUrl: module.getFileUrl( 'list.tpl.html' ),
        restrict: 'E',
        scope: { model: '=?' },
        controller: function( $scope ) {
          if( angular.isUndefined( $scope.model ) ) $scope.model = CnProgressReportModelFactory.root;
        }
      };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.directive( 'cnProgressReportView', [
    'CnProgressReportModelFactory',
    function( CnProgressReportModelFactory ) {
      return {
        templateUrl: module.getFileUrl( 'view.tpl.html' ),
        restrict: 'E',
        scope: { model: '=?' },
        controller: function( $scope ) {
          if( angular.isUndefined( $scope.model ) ) $scope.model = CnProgressReportModelFactory.root;
        }
      };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnProgressReportListFactory', [
    'CnBaseListFactory',
    function( CnBaseListFactory ) {
      var object = function( parentModel ) { CnBaseListFactory.construct( this, parentModel ); };
      return { instance: function( parentModel ) { return new object( parentModel ); } };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnProgressReportViewFactory', [
    'CnBaseViewFactory',
    function( CnBaseViewFactory ) {
      var object = function( parentModel, root ) { CnBaseViewFactory.construct( this, parentModel, root ); };
      return { instance: function( parentModel, root ) { return new object( parentModel, root ); } };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnProgressReportModelFactory', [
    'CnBaseModelFactory', 'CnProgressReportListFactory', 'CnProgressReportViewFactory',
    function( CnBaseModelFactory, CnProgressReportListFactory, CnProgressReportViewFactory ) {
      var object = function( root ) {
        var self = this;
        CnBaseModelFactory.construct( this, module );
        this.listModel = CnProgressReportListFactory.instance( this );
        this.viewModel = CnProgressReportViewFactory.instance( this, root );
      };

      return {
        root: new object( true ),
        instance: function() { return new object( false ); }
      };
    }
  ] );

} );
