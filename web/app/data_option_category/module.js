define( function() {
  'use strict';

  try { var module = cenozoApp.module( 'data_option_category', true ); } catch( err ) { console.warn( err ); return; }
  angular.extend( module, {
    identifier: { column: 'name_en' },
    name: {
      singular: 'data-option category',
      plural: 'data-option categories',
      possessive: 'data-option category\'s'
    },
    columnList: {
      rank: { title: 'Rank', type: 'rank' },
      name_en: { title: 'Name' },
      has_condition: { title: 'Has Condition', type: 'boolean' },
      note_en: { title: 'Note', type: 'text', limit: 20 }
    },
    defaultOrder: { column: 'rank', reverse: false }
  } );

  module.addInputGroup( '', {
    rank: {
      title: 'Rank',
      type: 'rank',
      isConstant: true
    },
    name_en: {
      title: 'Name (English)',
      type: 'string'
    },
    name_fr: {
      title: 'Name (French)',
      type: 'string'
    },
    condition_en: {
      title: 'Condition (English)',
      type: 'text',
      help: 'If provided then this statement must be agreed to by the applicant as a ' + 
            'condition to checking off any data option belonging to this category'
    },
    condition_fr: {
      title: 'Condition (French)',
      type: 'text',
      help: 'If provided then this statement must be agreed to by the applicant as a ' +
            'condition to checking off any data option belonging to this category'
    },
    note_en: {
      title: 'Note (English)',
      type: 'text'
    },
    note_fr: {
      title: 'Note (French)',
      type: 'text'
    }
  } );

  /* ######################################################################################################## */
  cenozo.providers.directive( 'cnDataOptionCategoryList', [
    'CnDataOptionCategoryModelFactory',
    function( CnDataOptionCategoryModelFactory ) {
      return {
        templateUrl: module.getFileUrl( 'list.tpl.html' ),
        restrict: 'E',
        scope: { model: '=?' },
        controller: function( $scope ) {
          if( angular.isUndefined( $scope.model ) ) $scope.model = CnDataOptionCategoryModelFactory.root;
        }
      };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.directive( 'cnDataOptionCategoryView', [
    'CnDataOptionCategoryModelFactory',
    function( CnDataOptionCategoryModelFactory ) {
      return {
        templateUrl: module.getFileUrl( 'view.tpl.html' ),
        restrict: 'E',
        scope: { model: '=?' },
        controller: function( $scope ) {
          if( angular.isUndefined( $scope.model ) ) $scope.model = CnDataOptionCategoryModelFactory.root;
        }
      };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnDataOptionCategoryListFactory', [
    'CnBaseListFactory',
    function( CnBaseListFactory ) {
      var object = function( parentModel ) { CnBaseListFactory.construct( this, parentModel ); };
      return { instance: function( parentModel ) { return new object( parentModel ); } };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnDataOptionCategoryViewFactory', [
    'CnBaseViewFactory',
    function( CnBaseViewFactory ) {
      var object = function( parentModel, root ) { CnBaseViewFactory.construct( this, parentModel, root ); }
      return { instance: function( parentModel, root ) { return new object( parentModel, root ); } };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnDataOptionCategoryModelFactory', [
    'CnBaseModelFactory', 'CnDataOptionCategoryListFactory', 'CnDataOptionCategoryViewFactory',
    function( CnBaseModelFactory, CnDataOptionCategoryListFactory, CnDataOptionCategoryViewFactory ) {
      var object = function( root ) {
        var self = this;
        CnBaseModelFactory.construct( this, module );
        this.listModel = CnDataOptionCategoryListFactory.instance( this );
        this.viewModel = CnDataOptionCategoryViewFactory.instance( this, root );
      };

      return {
        root: new object( true ),
        instance: function() { return new object( false ); }
      };
    }
  ] );

} );
