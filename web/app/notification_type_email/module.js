define( function() {
  'use strict';

  try { var module = cenozoApp.module( 'notification_type_email', true ); } catch( err ) { console.warn( err ); return; }
  angular.extend( module, {
    identifier: {
      parent: {
        subject: 'notification_type',
        column: 'notification_type.name'
      }
    },
    name: {
      singular: 'carbon copy',
      plural: 'carbon copies',
      possessive: 'carbon copy\'s'
    },
    columnList: {
      email: {
        title: 'Email'
      },
      blind: {
        title: 'BCC',
        type: 'boolean'
      }
    },
    defaultOrder: {
      column: 'email',
      reverse: false
    }
  } );

  module.addInputGroup( '', {
    email: {
      title: 'Email',
      type: 'string',
      format: 'email',
      help: 'Must be in the format "account@domain.name".'
    },
    blind: {
      title: 'Blind Carbon Copy',
      type: 'boolean',
      help: 'Whether to blind copy the email so that other recipiants do not see the email address.'
    }
  } );

  /* ######################################################################################################## */
  cenozo.providers.directive( 'cnNotificationTypeEmailAdd', [
    'CnNotificationTypeEmailModelFactory',
    function( CnNotificationTypeEmailModelFactory ) {
      return {
        templateUrl: module.getFileUrl( 'add.tpl.html' ),
        restrict: 'E',
        scope: { model: '=?' },
        controller: function( $scope ) {
          if( angular.isUndefined( $scope.model ) ) $scope.model = CnNotificationTypeEmailModelFactory.root;
        }
      };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.directive( 'cnNotificationTypeEmailList', [
    'CnNotificationTypeEmailModelFactory',
    function( CnNotificationTypeEmailModelFactory ) {
      return {
        templateUrl: module.getFileUrl( 'list.tpl.html' ),
        restrict: 'E',
        scope: { model: '=?' },
        controller: function( $scope ) {
          if( angular.isUndefined( $scope.model ) ) $scope.model = CnNotificationTypeEmailModelFactory.root;
        }
      };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.directive( 'cnNotificationTypeEmailView', [
    'CnNotificationTypeEmailModelFactory',
    function( CnNotificationTypeEmailModelFactory ) {
      return {
        templateUrl: module.getFileUrl( 'view.tpl.html' ),
        restrict: 'E',
        scope: { model: '=?' },
        controller: function( $scope ) {
          if( angular.isUndefined( $scope.model ) ) $scope.model = CnNotificationTypeEmailModelFactory.root;
        }
      };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnNotificationTypeEmailAddFactory', [
    'CnBaseAddFactory',
    function( CnBaseAddFactory ) {
      var object = function( parentModel ) { CnBaseAddFactory.construct( this, parentModel ); };
      return { instance: function( parentModel ) { return new object( parentModel ); } };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnNotificationTypeEmailListFactory', [
    'CnBaseListFactory',
    function( CnBaseListFactory ) {
      var object = function( parentModel ) { CnBaseListFactory.construct( this, parentModel ); };
      return { instance: function( parentModel ) { return new object( parentModel ); } };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnNotificationTypeEmailViewFactory', [
    'CnBaseViewFactory',
    function( CnBaseViewFactory ) {
      var object = function( parentModel, root ) { CnBaseViewFactory.construct( this, parentModel, root ); };
      return { instance: function( parentModel, root ) { return new object( parentModel, root ); } };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnNotificationTypeEmailModelFactory', [
    'CnBaseModelFactory',
    'CnNotificationTypeEmailAddFactory', 'CnNotificationTypeEmailListFactory', 'CnNotificationTypeEmailViewFactory',
    function( CnBaseModelFactory,
              CnNotificationTypeEmailAddFactory, CnNotificationTypeEmailListFactory, CnNotificationTypeEmailViewFactory ) {
      var object = function( root ) {
        var self = this;
        CnBaseModelFactory.construct( this, module );
        this.addModel = CnNotificationTypeEmailAddFactory.instance( this );
        this.listModel = CnNotificationTypeEmailListFactory.instance( this );
        this.viewModel = CnNotificationTypeEmailViewFactory.instance( this, root );
      };

      return {
        root: new object( true ),
        instance: function() { return new object( false ); }
      };
    }
  ] );

} );
