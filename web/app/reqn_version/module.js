define( [ 'coapplicant', 'ethics_approval', 'reference' ].reduce( function( list, name ) {
  return list.concat( cenozoApp.module( name ).getRequiredFiles() );
}, [] ), function() {
  'use strict';

  try { var module = cenozoApp.module( 'reqn_version', true ); } catch( err ) { console.warn( err ); return; }

  var coapplicantModule = cenozoApp.module( 'coapplicant' );
  var referenceModule = cenozoApp.module( 'reference' );

  angular.extend( module, {
    identifier: {
      parent: {
        subject: 'reqn',
        column: 'reqn.identifier'
      }
    },
    name: {
      singular: 'version',
      plural: 'versions',
      possessive: 'version\'s'
    },
    columnList: {
      amendment_version: {
        title: 'Version',
        type: 'string'
      },
      datetime: {
        title: 'Date & Time',
        type: 'datetime'
      },
      has_agreement_filename: {
        title: 'Has Agreement',
        type: 'boolean'
      }
    },
    defaultOrder: {
      column: 'amendment_version',
      reverse: true
    }
  } );

  module.addInputGroup( '', {
    reqn_id: { column: 'reqn.id', type: 'string' },
    amendment_version: { type: 'string' },
    amendment: { type: 'string' },
    is_current_version: { type: 'boolean' },
    applicant_name: { type: 'string' },
    applicant_position: { type: 'string' },
    applicant_affiliation: { type: 'string' },
    applicant_address: { type: 'string' },
    applicant_phone: { type: 'string' },
    applicant_email: { type: 'string' },
    trainee_name: { type: 'string' },
    trainee_program: { type: 'string' },
    trainee_institution: { type: 'string' },
    trainee_address: { type: 'string' },
    trainee_phone: { type: 'string' },
    trainee_email: { type: 'string' },
    start_date: { type: 'date' },
    duration: { type: 'enum' },
    title: { type: 'string' },
    keywords: { type: 'string' },
    lay_summary: { type: 'text' },
    background: { type: 'text' },
    objectives: { type: 'text' },
    methodology: { type: 'text' },
    analysis: { type: 'text' },
    funding: { type: 'enum' },
    funding_agency: { type: 'string' },
    grant_number: { type: 'string' },
    ethics: { type: 'enum' },
    ethics_date: { type: 'date' },
    waiver: { type: 'enum' },
    comprehensive: { type: 'boolean' },
    tracking: { type: 'boolean' },
    longitudinal: { type: 'boolean' },
    last_identifier: { type: 'string' },
    amendment_justification: { type: 'text' },

    current_final_report_id: { column: 'final_report.id', type: 'string' },
    trainee_user_id: { column: 'reqn.trainee_user_id', type: 'string' },
    identifier: { column: 'reqn.identifier', type: 'string' },
    external: { column: 'reqn.external', type: 'string' },
    state: { column: 'reqn.state', type: 'string' },
    data_directory: { column: 'reqn.data_directory', type: 'string' },
    status: { column: 'stage_type.status', type: 'string' },
    has_unread_notice: { type: 'boolean' },
    has_ethics_approval_list: { type: 'boolean' },
    stage_type: { column: 'stage_type.name', type: 'string' },
    phase: { column: 'stage_type.phase', type: 'string' },
    lang: { column: 'language.code', type: 'string' },
    deadline: { column: 'deadline.date', type: 'date' },
    deferral_note_amendment: { column: 'reqn.deferral_note_amendment', type: 'text' },
    deferral_note_1a: { column: 'reqn.deferral_note_1a', type: 'text' },
    deferral_note_1b: { column: 'reqn.deferral_note_1b', type: 'text' },
    deferral_note_1c: { column: 'reqn.deferral_note_1c', type: 'text' },
    deferral_note_1d: { column: 'reqn.deferral_note_1d', type: 'text' },
    deferral_note_1e: { column: 'reqn.deferral_note_1e', type: 'text' },
    deferral_note_1f: { column: 'reqn.deferral_note_1f', type: 'text' },
    deferral_note_2a: { column: 'reqn.deferral_note_2a', type: 'text' },
    deferral_note_2b: { column: 'reqn.deferral_note_2b', type: 'text' },
    deferral_note_2c: { column: 'reqn.deferral_note_2c', type: 'text' },
    deferral_note_2d: { column: 'reqn.deferral_note_2d', type: 'text' },
    deferral_note_2e: { column: 'reqn.deferral_note_2e', type: 'text' },
    deferral_note_2f: { column: 'reqn.deferral_note_2f', type: 'text' },
    deferral_note_2g: { column: 'reqn.deferral_note_2g', type: 'text' },

    coapplicant_agreement_filename: { type: 'string' },
    funding_filename: { type: 'string' },
    ethics_filename: { type: 'string' },
    new_user_id: {
      type: 'lookup-typeahead',
      typeahead: {
        table: 'user',
        select: 'CONCAT( user.first_name, " ", user.last_name )',
        where: [ 'user.first_name', 'user.last_name', 'user.name' ]
      }
    }
  } );

  /* ######################################################################################################## */
  cenozo.providers.directive( 'cnReqnVersionList', [
    'CnReqnVersionModelFactory',
    function( CnReqnVersionModelFactory ) {
      return {
        templateUrl: module.getFileUrl( 'list.tpl.html' ),
        restrict: 'E',
        scope: { model: '=?' },
        controller: function( $scope ) {
          if( angular.isUndefined( $scope.model ) ) $scope.model = CnReqnVersionModelFactory.root;
        }
      };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.directive( 'cnReqnVersionView', [
    'CnReqnVersionModelFactory', 'cnRecordViewDirective', 'CnEthicsApprovalModalAddFactory',
    'CnHttpFactory', 'CnSession', '$q',
    function( CnReqnVersionModelFactory, cnRecordViewDirective, CnEthicsApprovalModalAddFactory,
              CnHttpFactory, CnSession, $q ) {
      // used to piggy-back on the basic view controller's functionality
      var cnRecordView = cnRecordViewDirective[0];

      return {
        templateUrl: module.getFileUrl( 'view.tpl.html' ),
        restrict: 'E',
        scope: { model: '=?' },
        link: function( scope, element, attrs ) {
          cnRecordView.link( scope, element, attrs );
          scope.isAddingCoapplicant = false;
          scope.isDeletingCoapplicant = [];
          scope.isAddingReference = false;
          scope.isDeletingReference = [];
          scope.isDeletingEthicsApproval = [];
          scope.reportRequiredWarningShown = false;

          scope.liteModel.viewModel.onView();

          scope.model.viewModel.afterView( function() {
            var record = scope.model.viewModel.record;

            // display final report message if appropriate
            var stage_type = record.stage_type ? record.stage_type : '';
            if( 'applicant' == CnSession.role.name &&
                'Report Required' == stage_type &&
                'deferred' == scope.model.viewModel.record.state &&
                !scope.reportRequiredWarningShown ) {
              scope.model.viewModel.displayReportRequiredWarning();
              scope.reportRequiredWarningShown = true;
            }

            // display notices to the applicant if they've never seen it
            if( 'applicant' == CnSession.role.name && record.has_unread_notice ) scope.model.viewModel.displayNotices();
          } );

          // fill in the start date delay
          CnSession.promise.then( function() {
            scope.startDateDelay = CnSession.application.startDateDelay;
            scope.maxReferencesPerReqn = CnSession.application.maxReferencesPerReqn;
          } );

          scope.$watch( 'model.viewModel.record.start_date', function( date ) {
            var element = cenozo.getFormElement( 'start_date' );
            if( element ) {
              // clear out errors
              if( null != date && element.$error.required ) element.$error.required = false;
              if( element.$error.custom ) element.$error.custom = false;
              cenozo.updateFormElement( element, true );
            }
          } );
          scope.$watch( 'model.viewModel.record.lay_summary', function( text ) {
            scope.model.viewModel.charCount.lay_summary = text ? text.length : 0;
          } );
          scope.$watch( 'model.viewModel.record.background', function( text ) {
            scope.model.viewModel.charCount.background = text ? text.length : 0;
          } );
          scope.$watch( 'model.viewModel.record.objectives', function( text ) {
            scope.model.viewModel.charCount.objectives = text ? text.length : 0;
          } );
          scope.$watch( 'model.viewModel.record.methodology', function( text ) {
            scope.model.viewModel.charCount.methodology = text ? text.length : 0;
          } );
          scope.$watch( 'model.viewModel.record.analysis', function( text ) {
            scope.model.viewModel.charCount.analysis = text ? text.length : 0;
          } );
        },
        controller: function( $scope ) {
          if( angular.isUndefined( $scope.model ) ) $scope.model = CnReqnVersionModelFactory.root;
          if( angular.isUndefined( $scope.liteModel ) ) $scope.liteModel = CnReqnVersionModelFactory.lite;
          cnRecordView.controller[1]( $scope );

          // coapplicant resources
          var coapplicantAddModel = $scope.model.viewModel.coapplicantModel.addModel;
          $scope.coapplicantRecord = {};
          coapplicantAddModel.onNew( $scope.coapplicantRecord );

          $scope.getHeading = function() {
            var status = $scope.model.viewModel.record[$scope.model.isRole( 'applicant' ) ? 'status' : 'stage_type'];
            if( 'deferred' == $scope.model.viewModel.record.state ) {
              status = $scope.model.isRole( 'applicant' ) ? 'Action Required' : 'Deferred to Applicant';
            } else if( $scope.model.viewModel.record.state ) {
              status = $scope.model.viewModel.record.state.ucWords();
            }

            return [
              $scope.t( 'heading' ),
              '-',
              $scope.model.viewModel.record.identifier,
              'version',
              $scope.model.viewModel.record.amendment_version,
              '(' + status + ')'
            ].join( ' ' );
          };

          $scope.compareTo = function( version ) {
            $scope.model.viewModel.compareRecord = version;
            $scope.liteModel.viewModel.compareRecord = version;
            $scope.model.setQueryParameter( 'c', null == version ? undefined : version.amendment_version );
            $scope.model.reloadState( false, false, 'replace' );
          };

          $scope.addCoapplicant = function() {
            if( $scope.model.viewModel.coapplicantModel.getAddEnabled() ) {
              var form = cenozo.getScopeByQuerySelector( '#part1bForm' ).part1bForm;

              // we need to check each add-input for errors
              var valid = true;
              for( var property in $scope.model.viewModel.coapplicantModel.module.inputGroupList[0].inputList ) {
                // get the property's form element and remove any conflict errors, then see if it's invalid
                var currentElement = cenozo.getFormElement( property );
                currentElement.$error.conflict = false;
                cenozo.updateFormElement( currentElement );
                if( currentElement.$invalid ) {
                  valid = false;
                  break;
                }
              }
              if( !valid ) {
                // dirty all inputs so we can find the problem
                cenozo.forEachFormElement( 'part1bForm', function( element ) { element.$dirty = true; } );
              } else {
                $scope.isAddingCoapplicant = true;
                coapplicantAddModel.onAdd( $scope.coapplicantRecord ).then( function( response ) {
                  form.$setPristine();
                  return $q.all( [
                    coapplicantAddModel.onNew( $scope.coapplicantRecord ),
                    $scope.model.viewModel.getCoapplicantList().then( function() {
                      $scope.model.viewModel.determineCoapplicantDiffs();
                    } )
                  ] );
                } ).finally( function() { $scope.isAddingCoapplicant = false; } );
              }
            }
          };

          $scope.removeCoapplicant = function( id ) {
            if( $scope.model.viewModel.coapplicantModel.getDeleteEnabled() ) {
              if( !$scope.isDeletingCoapplicant.includes( id ) ) $scope.isDeletingCoapplicant.push( id );
              var index = $scope.isDeletingCoapplicant.indexOf( id );
              $scope.model.viewModel.removeCoapplicant( id ).finally( function() {
                if( 0 <= index ) $scope.isDeletingCoapplicant.splice( index, 1 );
              } );
            }
          };

          // reference resources
          var referenceAddModel = $scope.model.viewModel.referenceModel.addModel;
          $scope.referenceRecord = {};
          referenceAddModel.onNew( $scope.referenceRecord );

          $scope.addReference = function() {
            if( $scope.model.viewModel.referenceModel.getAddEnabled() ) {
              var form = cenozo.getScopeByQuerySelector( '#part1dForm' ).part1dForm;
              if( !form.$valid ) {
                // dirty all inputs so we can find the problem
                cenozo.forEachFormElement( 'part1dForm', function( element ) { element.$dirty = true; } );
              } else {
                $scope.isAddingReference = true;
                referenceAddModel.onAdd( $scope.referenceRecord ).then( function( response ) {
                  form.$setPristine();
                  return $q.all( [
                    referenceAddModel.onNew( $scope.referenceRecord ),
                    $scope.model.viewModel.getReferenceList().then( function() {
                      $scope.model.viewModel.determineReferenceDiffs();
                    } )
                  ] );
                } ).finally( function() { $scope.isAddingReference = false; } );
              }
            }
          };

          $scope.removeReference = function( id ) {
            if( $scope.model.viewModel.referenceModel.getDeleteEnabled() ) {
              if( !$scope.isDeletingReference.includes( id ) ) $scope.isDeletingReference.push( id );
              var index = $scope.isDeletingReference.indexOf( id );
              $scope.model.viewModel.removeReference( id ).finally( function() {
                if( 0 <= index ) $scope.isDeletingReference.splice( index, 1 );
              } );
            }
          };

          $scope.setReferenceRank = function( id, rank ) {
            $scope.model.viewModel.setReferenceRank( id, rank );
          };

          $scope.addEthicsApproval = function() {
            return CnEthicsApprovalModalAddFactory.instance( {
              language: $scope.model.viewModel.record.lang
            } ).show().then( function( response ) {
              if( response ) {
                var file = response.file;
                var date = response.date;
                return CnHttpFactory.instance( {
                  path: 'ethics_approval',
                  data: {
                    reqn_id: $scope.model.viewModel.record.reqn_id,
                    filename: file.getFilename(),
                    date: date
                  }
                } ).post().then( function( response ) {
                  file.upload( [
                    'reqn',
                    $scope.model.viewModel.record.reqn_id,
                    'ethics_approval',
                    response.data
                  ].join( '/' ) ).then( function() {
                    $scope.model.viewModel.getEthicsApprovalList();
                  } );
                } );
              }
            } );
          };

          $scope.isRemoveEthicsApprovalAllowed = function( id ) {
            if( $scope.model.viewModel.ethicsApprovalModel.getDeleteEnabled() ) {
              if( 'administrator' == CnSession.role.name ) return true;
              else if( 'applicant' == CnSession.role.name ) {
                var ethicsApproval = $scope.model.viewModel.record.ethicsApprovalList.findByProperty( 'id', id );
                return null != ethicsApproval && ethicsApproval.one_day_old;
              }
            }
            return false;
          };

          $scope.removeEthicsApproval = function( id ) {
            if( $scope.model.viewModel.ethicsApprovalModel.getDeleteEnabled() ) {
              if( !$scope.isDeletingEthicsApproval.includes( id ) ) $scope.isDeletingEthicsApproval.push( id );
              var index = $scope.isDeletingEthicsApproval.indexOf( id );
              $scope.model.viewModel.removeEthicsApproval( id ).finally( function() {
                if( 0 <= index ) $scope.isDeletingEthicsApproval.splice( index, 1 );
              } );
            }
          };

          $scope.check = function( property ) {
            // The cn-reqn-form directive makes use of cn-add-input directives.  These directives need their
            // parent to have a check() function which checks to see whether the input is valid or not.  Since
            // that function is usually in the cn-record-add directive we have to implement on here instead.
            var element = cenozo.getFormElement( property );
            if( element ) {
              // Both the coapplicant and reference cn-add-input directives share this method, so differentiate
              // by checking to see which module has the property
              if( null != coapplicantModule.getInput( property ) ) {
                element.$error.format = !$scope.model.viewModel.coapplicantModel.testFormat(
                  property, $scope.coapplicantRecord[property]
                );
              } else if( null != referenceModule.getInput( property ) ) {
                element.$error.format = !$scope.model.viewModel.referenceModel.testFormat(
                  property, $scope.referenceRecord[property]
                );
              }
              cenozo.updateFormElement( element, true );
            }
          };

          $scope.t = function( value ) { return $scope.model.viewModel.translate( value ); };
        }
      };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnReqnVersionListFactory', [
    'CnBaseListFactory',
    function( CnBaseListFactory ) {
      var object = function( parentModel ) { CnBaseListFactory.construct( this, parentModel ); };
      return { instance: function( parentModel ) { return new object( parentModel ); } };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnReqnVersionViewFactory', [
    'CnReqnHelper', 'CnModalNoticeListFactory',
    'CnCoapplicantModelFactory', 'CnReferenceModelFactory', 'CnEthicsApprovalModelFactory', 'CnBaseViewFactory',
    'CnSession', 'CnHttpFactory', 'CnModalMessageFactory', 'CnModalConfirmFactory', 'CnModalSubmitExternalFactory',
    '$state', '$q', '$window',
    function( CnReqnHelper, CnModalNoticeListFactory,
              CnCoapplicantModelFactory, CnReferenceModelFactory, CnEthicsApprovalModelFactory, CnBaseViewFactory,
              CnSession, CnHttpFactory, CnModalMessageFactory, CnModalConfirmFactory, CnModalSubmitExternalFactory,
              $state, $q, $window ) {
      var object = function( parentModel, root ) {
        var self = this;
        CnBaseViewFactory.construct( this, parentModel, root );

        this.deferred.promise.then( function() {
          if( angular.isDefined( self.stageModel ) ) self.stageModel.listModel.heading = 'Stage History';
        } );

        this.configureFileInput( 'coapplicant_agreement_filename' );
        this.configureFileInput( 'funding_filename' );
        this.configureFileInput( 'ethics_filename' );
        this.configureFileInput( 'data_sharing_filename' );
        this.configureFileInput( 'agreement_filename' );

        angular.extend( this, {
          compareRecord: null,
          versionList: [],
          lastAgreementVersion: null,
          coapplicantAgreementList: [],
          agreementDifferenceList: null,
          lastAmendmentVersion: null, // used to determine the addingCoapplicantWithData variable
          addingCoapplicantWithData: false, // used when an amendment is adding a new coap
          show: function( subject ) {
            var stage_type = this.record.stage_type ? this.record.stage_type : '';
            return CnReqnHelper.showAction( subject, this.record ) && (
              // the submit button should be hidden once a report is required
              'submit' != subject || 'Report Required' != stage_type
            );
          },
          showAgreement: function() {
            // only show the agreement tab to administrators
            return 'administrator' == CnSession.role.name && (
              // and when there is an agreement
              this.record.has_agreement_filename || (
                // or when we're looking at the current version and we're in the active or complete phases
                this.record.is_current_version && ['active','complete'].includes( self.record.phase )
              )
            );
          },
          abandon: function() {
            return CnReqnHelper.abandon(
              'identifier=' + this.record.identifier,
              '.' != this.record.amendment,
              this.record.lang
            ).then( function( response ) {
              if( response ) $state.go( 'applicant' == CnSession.role.name ? 'root.home' : 'reqn.list' );
            } );
          },
          delete: function() { return CnReqnHelper.delete( 'identifier=' + this.record.identifier, this.record.lang ); },
          translate: function( value ) {
            return this.record.lang ? CnReqnHelper.translate( 'reqn', value, this.record.lang ) : '';
          },
          viewReport: function() { $state.go( 'final_report.view', { identifier: this.record.current_final_report_id } ); },
          downloadApplication: function() { return CnReqnHelper.download( 'application', this.record.getIdentifier() ); },
          downloadChecklist: function() { return CnReqnHelper.download( 'checklist', this.record.getIdentifier() ); },
          downloadApplicationAndChecklist: function() {
            return CnReqnHelper.download( 'application_and_checklist', this.record.getIdentifier() );
          },
          downloadDataSharing: function() { return CnReqnHelper.download( 'data_sharing_filename', this.record.getIdentifier() ); },
          downloadCoapplicantAgreement: function( reqnVersionId) {
            return CnReqnHelper.download( 'coapplicant_agreement_filename', reqnVersionId );
          },
          downloadCoapplicantAgreementTemplate: function() {
            return CnReqnHelper.download( 'coapplicant_agreement_template', this.record.getIdentifier() );
          },

          onView: function( force ) {
            // reset tab values
            this.setFormTab( 0, this.parentModel.getQueryParameter( 't0' ), false );
            this.setFormTab( 1, this.parentModel.getQueryParameter( 't1' ), false );
            this.setFormTab( 2, this.parentModel.getQueryParameter( 't2' ), false );

            // reset compare version and differences
            this.compareRecord = null;
            this.coapplicantAgreementList = [];
            this.agreementDifferenceList = null;

            return this.$$onView( force ).then( function() {
              // define the earliest date that the reqn may start (based on the deadline, or today if there is no deadline)
              if( !self.record.external ) {
                self.minStartDate = self.record.deadline
                                  ? moment( self.record.deadline ).add( CnSession.application.startDateDelay, 'months' )
                                  : moment();
              }

              if( 'lite' != self.parentModel.type ) {
                cenozoApp.setLang( self.record.lang );

                var promiseList = [
                  self.getAmendmentTypeList(),
                  self.getCoapplicantList(),
                  self.getReferenceList(),
                  self.getDataOptionValueList()
                ];
                if( self.record.has_ethics_approval_list ) promiseList.push( self.getEthicsApprovalList() );
                return $q.all( promiseList ).then( function() { return self.getVersionList(); } );
              }
            } );
          },

          onPatch: function( data ) {
            if( !this.parentModel.getEditEnabled() ) throw new Error( 'Calling onPatch() but edit is not enabled.' );

            var promise = null;
            var property = Object.keys( data )[0];

            if( null != property.match( /^justification_/ ) ) {
              // justifications have their own service
              var match = property.match( /^justification_([0-9]+)$/ );
              var dataOptionId = match[1];

              promise = CnHttpFactory.instance( {
                path: [
                  'reqn_version',
                  self.record.id,
                  'reqn_version_justification',
                  'data_option_id=' + dataOptionId
                ].join( '/' ),
                data: { description: data[property] }
              } ).patch().then( function() {
                self.record['justification_' + dataOptionId] = data[property];
              } );
            } else if( null != property.match( /^comment_/ ) ) {
              // comments have their own service
              var match = property.match( /^comment_([0-9]+)$/ );
              var dataOptionCategoryId = match[1];

              promise = CnHttpFactory.instance( {
                path: [
                  'reqn_version',
                  self.record.id,
                  'reqn_version_comment',
                  'data_option_category_id=' + dataOptionCategoryId
                ].join( '/' ),
                data: { description: data[property] }
              } ).patch().then( function() {
                self.record['comment_' + dataOptionCategoryId] = data[property];
              } );
            } else if( null != property.match( /^deferral_note/ ) ) {
              // make sure to send patches to deferral notes to the parent reqn
              var parent = this.parentModel.getParentIdentifier();
              var httpObj = {
                path: parent.subject + '/' + parent.identifier,
                data: data
              };
              httpObj.onError = function( response ) { self.onPatchError( response ); };
              promise = CnHttpFactory.instance( httpObj ).patch().then( function() {
                self.afterPatchFunctions.forEach( function( fn ) { fn(); } );
              } );
            } else {
              var promiseList = [];
              if( 'new_user_id' == property ) {
                // make sure the new user isn't a trainee
                promiseList.push(
                  CnHttpFactory.instance( {
                    path: 'applicant/user_id=' + data[property],
                    data: { select: { column: 'supervisor_user_id' } },
                    onError: function( response ) {
                      if( 404 == response.status ) {
                        CnModalMessageFactory.instance( {
                          title: self.translate( 'misc.invalidNewApplicantTitle' ),
                          message: self.translate( 'misc.invalidNewApplicantMessage' ),
                          closeText: self.translate( 'misc.close' ),
                          error: true
                        } ).show().then( function() {
                          // failed to set the new user so put it back
                          self.formattedRecord.new_user_id = self.backupRecord.formatted_new_user_id;
                          return true;
                        } );
                      } else CnModalMessageFactory.httpError( response );
                    }
                  } ).get().then( function( response ) {
                    if( angular.isObject( response.data ) && null != response.data.supervisor_user_id ) {
                      return CnModalMessageFactory.instance( {
                        title: self.translate( 'amendment.newUserIsTraineeNoticeTitle' ),
                        message: self.translate( 'amendment.newUserIsTraineeNotice' ),
                        closeText: self.translate( 'misc.close' ),
                        error: true
                      } ).show().then( function() {
                        // failed to set the new user so put it back
                        self.formattedRecord.new_user_id = self.backupRecord.formatted_new_user_id;
                        return true;
                      } );
                    }
                  } )
                );
              }

              promise = $q.all( promiseList ).then( function( response ) {
                // only proceed if the above check isn't true (prevent trainees to be the new primary applicant)
                if( true !== response[0] ) return self.$$onPatch( data ).then( function() {
                  if( angular.isDefined( data.comprehensive ) || angular.isDefined( data.tracking ) ) {
                    if( self.record.comprehensive && self.record.tracking ) {
                      // show the cohort warning to the applicant
                      CnModalMessageFactory.instance( {
                        title: self.translate( 'part2.cohort.bothCohortNoticeTitle' ),
                        message: self.translate( 'part2.cohort.bothCohortNotice' ),
                        closeText: self.translate( 'misc.close' ),
                      } ).show();
                    }
                  }
                } );
              } );
            }

            return promise;
          },

          onPatchError: function( response ) {
            if( 306 == response.status && null != response.data.match( /^"You cannot change the primary applicant/ ) ) {
              // failed to set the new user so put it back
              self.formattedRecord.new_user_id = self.backupRecord.formatted_new_user_id;
            }

            return this.$$onPatchError( response );
          },

          coapplicantModel: CnCoapplicantModelFactory.instance(),
          referenceModel: CnReferenceModelFactory.instance(),
          ethicsApprovalModel: CnEthicsApprovalModelFactory.instance(),
          // only allow editing the description elements when not in an amendment
          isDescriptionConstant: function() { return '.' != self.record.amendment; },
          charCount: { lay_summary: 0, background: 0, objectives: 0, methodology: 0, analysis: 0 },
          minStartDate: null,
          noAmendmentTypes: false,

          amendmentTypeWithJustificationSelected: function() {
            return angular.isDefined( this.parentModel.amendmentTypeList ) ?
              this.parentModel.amendmentTypeList.en.some( function( amendmentType ) {
                return null != amendmentType.justificationPrompt && self.record['amendmentType' + amendmentType.id];
              } ) :
              false;
          },

          // setup language and tab state parameters
          toggleLanguage: function() {
            var parent = this.parentModel.getParentIdentifier();
            this.record.lang = 'en' == this.record.lang ? 'fr' : 'en';
            cenozoApp.setLang( this.record.lang );
            return CnHttpFactory.instance( {
              path: parent.subject + '/' + parent.identifier,
              data: { language: this.record.lang }
            } ).patch();
          },

          // the sequencial list of all tabs where every item has an array of the three indexed tab values
          formTab: [],
          tabSectionList: [
            [ 'instructions', null, null ],
            [ 'part1', 'a', null ],
            [ 'part1', 'b', null ],
            [ 'part1', 'c', null ],
            [ 'part1', 'd', null ],
            [ 'part1', 'e', null ],
            [ 'part1', 'f', null ],
            [ 'part2', null, 'notes' ],
            [ 'part2', null, 'cohort' ],
            [ 'part2', null, 'a' ],
            [ 'part2', null, 'b' ],
            [ 'part2', null, 'c' ],
            [ 'part2', null, 'd' ],
            [ 'part2', null, 'e' ],
            [ 'part2', null, 'f' ],
            [ 'part2', null, 'g' ],
            [ 'part3', null, null ],
            [ 'agreement', null, null ]
          ],

          setFormTab: function( index, tab, transition ) {
            if( angular.isUndefined( transition ) ) transition = true;
            if( !( 0 <= index && index <= 2 ) ) index = 0;

            // find the tab section
            var selectedTabSection = null;
            this.tabSectionList.some( function( tabSection ) {
              if( tab == tabSection[index] ) {
                selectedTabSection = tabSection;
                return true;
              }
            } );

            // get the tab (or default of none was found)
            tab = null != selectedTabSection && null != selectedTabSection[index]
                ? selectedTabSection[index]
                : ( 0 == index ? 'instructions' : 1 == index ? 'a' : 'notes' );

            self.formTab[index] = tab;
            self.parentModel.setQueryParameter( 't'+index, tab );

            if( transition ) this.parentModel.reloadState( false, false, 'replace' );

            // update all textarea sizes
            angular.element( 'textarea[cn-elastic]' ).trigger( 'elastic' );
          },

          nextSection: function( reverse ) {
            if( angular.isUndefined( reverse ) ) reverse = false;

            var currentTabSectionIndex = null;
            this.tabSectionList.some( function( tabSection, index ) {
              if( self.formTab[0] == tabSection[0] ) {
                if( ( null == tabSection[1] || self.formTab[1] == tabSection[1] ) &&
                    ( null == tabSection[2] || self.formTab[2] == tabSection[2] ) ) {
                  currentTabSectionIndex = index;
                  return true;
                }
              }
            } );

            if( null != currentTabSectionIndex ) {
              var tabSection = this.tabSectionList[currentTabSectionIndex + (reverse?-1:1)];

              // always skip the agreement section
              if( 'agreement' == tabSection[0] )
                tabSection = this.tabSectionList[currentTabSectionIndex + (reverse?-2:2)];

              if( angular.isDefined( tabSection ) ) {
                if( null != tabSection[2] ) this.setFormTab( 2, tabSection[2], false );
                if( null != tabSection[1] ) this.setFormTab( 1, tabSection[1], false );
                this.setFormTab( 0, tabSection[0] );
              }
            }
          },

          getDifferences: function( reqnVersion2 ) {
            var reqnVersion1 = this.record;
            var differences = {
              diff: false,
              amendment: {
                diff: false,
                a: { // the only unnamed amendment category
                  diff: false,
                  new_user_id: false,
                  amendment_justification: false
                }
              },
              part1: {
                diff: false,
                a: { // applicant
                  diff: false,
                  applicant_position: false,
                  applicant_affiliation: false,
                  applicant_address: false,
                  applicant_phone: false,
                  trainee_program: false,
                  trainee_institution: false,
                  trainee_address: false,
                  trainee_phone: false,
                  waiver: false
                },
                b: { // project team
                  diff: false,
                  coapplicantList: [],
                  coapplicant_agreement_filename: false
                },
                c: { // timeline
                  diff: false,
                  start_date: false,
                  duration: false
                },
                d: { // description
                  diff: false,
                  title: false,
                  keywords: false,
                  lay_summary: false,
                  background: false,
                  objectives: false,
                  methodology: false,
                  analysis: false,
                  referenceList: []
                },
                e: { // scientific review
                  diff: false,
                  funding: false,
                  funding_filename: false,
                  funding_agency: false,
                  grant_number: false
                },
                f: { // ethics
                  diff: false,
                  ethics: false,
                  ethics_date: false,
                  ethics_filename: false
                }
              },
              part2: {
                diff: false,
                cohort: {
                  diff: false,
                  comprehensive: false,
                  tracking: false
                },
                a: { // questionnaires
                  diff: false,
                  baselineDataOptionList: [],
                  followUp1DataOptionList: [],
                  dataOptionJustificationList: [],
                  comment: false
                },
                b: { // physical assessments
                  diff: false,
                  baselineDataOptionList: [],
                  followUp1DataOptionList: [],
                  dataOptionJustificationList: [],
                  comment: false
                },
                c: { // biomarkers
                  diff: false,
                  baselineDataOptionList: [],
                  followUp1DataOptionList: [],
                  dataOptionJustificationList: [],
                  comment: false
                },
                d: { // linked data
                  diff: false,
                  data_sharing_filename: false,
                  baselineDataOptionList: [],
                  followUp1DataOptionList: [],
                  dataOptionJustificationList: [],
                  comment: false
                },
                e: { // additional data
                  diff: false,
                  baselineDataOptionList: [],
                  followUp1DataOptionList: [],
                  dataOptionJustificationList: [],
                  comment: false
                },
                f: { // geographic indicators
                  diff: false,
                  baselineDataOptionList: [],
                  followUp1DataOptionList: [],
                  dataOptionJustificationList: [],
                  comment: false
                },
                g: { // covid-19
                  diff: false,
                  baselineDataOptionList: [],
                  followUp1DataOptionList: [],
                  dataOptionJustificationList: [],
                  comment: false
                }
              }
            };

            // add all amendment types
            self.parentModel.amendmentTypeList.en.forEach( function( amendmentType ) {
              differences.amendment.a['amendmentType'+amendmentType.id] = false;
            } );

            if( null != reqnVersion2 ) {
              for( var part in differences ) {
                if( !differences.hasOwnProperty( part ) ) continue;
                if( 'diff' == part ) continue; // used to track overall diff

                for( var section in differences[part] ) {
                  if( !differences[part].hasOwnProperty( section ) ) continue;
                  if( 'diff' == section ) continue; // used to track overall diff

                  for( var property in differences[part][section] ) {
                    if( !differences[part][section].hasOwnProperty( property ) ) continue;
                    if( angular.isArray( differences[part][section][property] ) ) {
                      // an array means we have a list go check through
                      if( 'coapplicantList' == property ) {
                        // loop through reqnVersion1's coapplicants to see if any were added or changed
                        reqnVersion1.coapplicantList.forEach( function( c1 ) {
                          var c2 = reqnVersion2.coapplicantList.findByProperty( 'name', c1.name );
                          if( null == c2 ) {
                            // reqnVersion1 has coapplicant that compared reqnVersion2 doesn't
                            differences.diff = true;
                            differences[part].diff = true;
                            differences[part][section].diff = true;
                            differences[part][section][property].push( { name: c1.name, diff: 'added' } );
                          } else {
                            if( ['position', 'affiliation', 'email', 'role', 'access'].some( function( p ) {
                              return c1[p] != c2[p];
                            } ) ) {
                              // reqnVersion1 has coapplicant which is different than compared reqnVersion2
                              differences.diff = true;
                              differences[part].diff = true;
                              differences[part][section].diff = true;
                              differences[part][section][property].push( { name: c1.name, diff: 'changed' } );
                            }
                          }
                        } );

                        // loop through compared reqnVersion2's coapplicants to see if any were removed
                        reqnVersion2.coapplicantList.forEach( function( c2 ) {
                          var c1 = reqnVersion1.coapplicantList.findByProperty( 'name', c2.name );
                          if( null == c2 ) {
                            // reqnVersion1 has coapplicant that compared reqnVersion2 doesn't
                            differences.diff = true;
                            differences[part].diff = true;
                            differences[part][section].diff = true;
                            differences[part][section][property].push( { name: c2.name, diff: 'removed' } );
                          }
                        } );
                      } else if( 'referenceList' == property ) {
                        // loop through reqnVersion1's references to see if any were added or changed
                        reqnVersion1.referenceList.forEach( function( r1 ) {
                          var r2 = reqnVersion2.referenceList.findByProperty( 'reference', r1.reference );
                          if( null == r2 ) {
                            // reqnVersion1 has reference that compared reqnVersion2 doesn't
                            differences.diff = true;
                            differences[part].diff = true;
                            differences[part][section].diff = true;
                            differences[part][section][property].push( { name: r1.reference, diff: 'added' } );
                          }
                        } );

                        // loop through compared reqnVersion2's references to see if any were removed
                        reqnVersion2.referenceList.forEach( function( r2 ) {
                          var r1 = reqnVersion1.referenceList.findByProperty( 'reference', r2.reference );
                          if( null == r1 ) {
                            // reqnVersion1 has reference that compared reqnVersion2 doesn't
                            differences.diff = true;
                            differences[part].diff = true;
                            differences[part][section].diff = true;
                            differences[part][section][property].push( { name: r2.reference, diff: 'removed' } );
                          }
                        } );
                      } else if( 'baselineDataOptionList' == property ) {
                        self.parentModel.dataOptionCategoryList.forEach( function( dataOptionCategory ) {
                          // section a checks rank 1, section b checks rank 2, etc
                          if( dataOptionCategory.rank == section.charCodeAt() - 'a'.charCodeAt() + 1 ) {
                            dataOptionCategory.optionList.forEach( function( dataOption ) {
                              if( dataOption.bl ) {
                                if( reqnVersion1.dataOptionValueList.bl[dataOption.id] !=
                                    reqnVersion2.dataOptionValueList.bl[dataOption.id] ) {
                                  differences.diff = true;
                                  differences[part].diff = true;
                                  differences[part][section].diff = true;
                                  differences[part][section][property].push( {
                                    id: dataOption.id,
                                    name: dataOption.name.en,
                                    diff: reqnVersion1.dataOptionValueList.bl[dataOption.id] ? 'added' : 'removed'
                                  } );
                                }
                              }
                            } );
                          }
                        } );
                      } else if( 'followUp1DataOptionList' == property ) {
                        self.parentModel.dataOptionCategoryList.forEach( function( dataOptionCategory ) {
                          // section a checks rank 1, section b checks rank 2, etc
                          if( dataOptionCategory.rank == section.charCodeAt() - 'a'.charCodeAt() + 1 ) {
                            dataOptionCategory.optionList.forEach( function( dataOption ) {
                              if( dataOption.f1 ) {
                                if( reqnVersion1.dataOptionValueList.f1[dataOption.id] !=
                                    reqnVersion2.dataOptionValueList.f1[dataOption.id] ) {
                                  differences.diff = true;
                                  differences[part].diff = true;
                                  differences[part][section].diff = true;
                                  differences[part][section][property].push( {
                                    id: dataOption.id,
                                    name: dataOption.name.en,
                                    diff: reqnVersion1.dataOptionValueList.f1[dataOption.id] ? 'added' : 'removed'
                                  } );
                                }
                              }
                            } );
                          }
                        } );
                      } else if( 'dataOptionJustificationList' == property ) {
                        for( var prop in reqnVersion1 ) {
                          if( null != prop.match( /^justification_/ ) ) {
                            if( reqnVersion1[prop] != reqnVersion2[prop] ) {
                              var match = prop.match( /^justification_([0-9]+)$/ );
                              var dataOption = self.parentModel.getCategoryAndDataOption( match[1] ).dataOption;
                              differences.diff = true;
                              differences[part].diff = true;
                              differences[part][section].diff = true;
                              differences[part][section][property].push( {
                                id: dataOption.id,
                                name: dataOption.name.en,
                                diff: reqnVersion1.dataOptionValueList.f1[dataOption.id] ? 'added' : 'removed'
                              } );
                            }
                          }
                        }
                      }
                    } else if( null != property.match( /_filename$/ ) ) {
                      // if both file names are empty or null then assume there is no difference
                      var recordName = angular.isUndefined( reqnVersion1[property] ) ? null : reqnVersion1[property];
                      var compareName = angular.isUndefined( reqnVersion2[property] ) ? null : reqnVersion2[property];

                      if( !( recordName == null && compareName == null ) ) {
                        // file size are compared instead of filename
                        var fileDetails = self.parentModel.viewModel.fileList.findByProperty( 'key', property );
                        var sizeProperty = property.replace( '_filename', '_size' );
                        var recordSize = angular.isObject( fileDetails ) && fileDetails.size ? fileDetails.size : null;
                        var compareSize = reqnVersion2[sizeProperty] ? reqnVersion2[sizeProperty] : null;
                        if( ( null != recordSize || null != compareSize ) && recordSize != compareSize ) {
                          differences.diff = true;
                          differences[part].diff = true;
                          differences[part][section].diff = true;
                          differences[part][section][property] = true;
                        }
                      }
                    } else if( 'comment' == property ) {
                      // only check comments if they are activated for this category
                      if( 'comment' == property ) {
                        var dataOptionCategory = self.parentModel.dataOptionCategoryList.findByProperty( 'charCode', section );
                        if( dataOptionCategory.comment ) {
                          // a comment's property in the record is followed by the data_category_id
                          var commentProperty = 'comment_' + dataOptionCategory.id;
                          var value1 = '' === reqnVersion1[commentProperty] ? null : reqnVersion1[commentProperty];
                          var value2 = '' === reqnVersion2[commentProperty] ? null : reqnVersion2[commentProperty];
                          if( value1 != value2 ) {
                            differences.diff = true;
                            differences[part].diff = true;
                            differences[part][section].diff = true;
                            differences[part][section][property] = true;
                          }
                        }
                      }
                    } else {
                      // not an array means we have a property to directly check
                      // note: we need to convert empty strings to null to make sure they compare correctly
                      var value1 = '' === reqnVersion1[property] ? null : reqnVersion1[property];
                      var value2 = '' === reqnVersion2[property] ? null : reqnVersion2[property];
                      if( value1 != value2 ) {
                        differences.diff = true;
                        differences[part].diff = true;
                        differences[part][section].diff = true;
                        differences[part][section][property] = true;
                      }
                    }
                  }
                }
              }
            }

            return differences;
          },

          getVersionList: function() {
            var parent = self.parentModel.getParentIdentifier();
            this.versionList = [];
            return CnHttpFactory.instance( {
              path: parent.subject + '/' + parent.identifier + '/reqn_version'
            } ).query().then( function( response ) {
              var promiseList = [];

              response.data.forEach( function( version ) {
                promiseList = promiseList.concat( [
                  self.getAmendmentTypeList( version.id, version ),

                  self.getCoapplicantList( version.id, version ).then( function() {
                    // see if there is a difference between this list and the view's list
                    self.setCoapplicantDiff( version );
                  } ),

                  self.getReferenceList( version.id, version ).then( function() {
                    // see if there is a difference between this list and the view's list
                    self.setReferenceDiff( version );
                  } ),

                  self.getDataOptionValueList( version.id, version ),

                  // add the file sizes
                  CnHttpFactory.instance( {
                    path: 'reqn_version/' + version.id + '?file=coapplicant_agreement_filename'
                  } ).get().then( function( response ) {
                    version.coapplicant_agreement_size = response.data;
                  } ),

                  CnHttpFactory.instance( {
                    path: 'reqn_version/' + version.id + '?file=funding_filename'
                  } ).get().then( function( response ) {
                    version.funding_size = response.data;
                  } ),

                  CnHttpFactory.instance( {
                    path: 'reqn_version/' + version.id + '?file=ethics_filename'
                  } ).get().then( function( response ) {
                    version.ethics_size = response.data;
                  } ),

                  CnHttpFactory.instance( {
                    path: 'reqn_version/' + version.id + '?file=data_sharing_filename'
                  } ).get().then( function( response ) {
                    version.data_sharing_size = response.data;
                  } )
                ] );

                self.versionList.push( version );
              } );

              var compareVersion = self.parentModel.getQueryParameter( 'c' );
              if( angular.isDefined( compareVersion ) )
                self.compareRecord = self.versionList.findByProperty( 'amendment_version', compareVersion );

              if( 1 < self.versionList.length ) {
                // add a null object to the version list so we can turn off comparisons
                self.versionList.unshift( null );
              }

              self.lastAmendmentVersion = null;
              if( '.' != self.record.amendment ) {
                self.versionList.slice().reverse().some( function( version ) {
                  // Note that the amendments we're comparing are letters, and since . is considered less than A it works
                  // whether we're comparing lettered versions or the initial "." version:
                  if( self.record.amendment > version.amendment ) {
                    self.lastAmendmentVersion = version.amendment_version;
                    return true;
                  }
                } );
              }

              return $q.all( promiseList ).then( function() {
                // Calculate all differences for all versions (in reverse order so we can find the last agreement version)
                self.versionList.reverse();

                self.lastAgreementVersion = null;
                self.versionList.forEach( function( version ) {
                  if( null != version ) {
                    version.differences = self.getDifferences( version );

                    // while we're at it determine the list of coapplicant agreements
                    if( null != version.coapplicant_agreement_filename )
                      self.coapplicantAgreementList.push( { version: version.amendment_version, id: version.id } );

                    // ... and also determine the last agreement version and calculate its differences
                    if( null == self.agreementDifferenceList && null != version.agreement_filename )
                      self.agreementDifferenceList = self.getDifferenceList( version );
                  }
                } );

                // if no different list was defined then make it an empty list
                if( null == self.agreementDifferenceList ) self.agreementDifferenceList = [];

                // put the order of the version list back to normal
                self.versionList.reverse();
              } );
            } );
          },

          determineCoapplicantDiffs: function() {
            this.versionList.forEach( version => self.setCoapplicantDiff( version ) );
          },

          setCoapplicantDiff: function( version ) {
            if( null != version ) {
              // see if there is a difference between this list and the view's list
              version.coapplicantDiff =
                version.coapplicantList.length != self.record.coapplicantList.length ||
                version.coapplicantList.some(
                  c1 => !self.record.coapplicantList.some(
                    c2 => ![ 'name', 'position', 'affiliation', 'email', 'role', 'access' ].some(
                      prop => c1[prop] != c2[prop]
                    )
                  )
                );

              // When an amendment is made which adds coapplicants with access to data we need to get a signed agreement
              // form from the user.  In order to do this we need a variable that tracks when this is the case:
              if( '.' != this.record.amendment && self.lastAmendmentVersion == version.amendment_version ) {
                self.addingCoapplicantWithData = false;
                if( version.coapplicantDiff ) {
                  // There is a difference between this and the previous amendment version, so now determine if there is now
                  // a coapplicant with access to the data which didn't exist in the previous version
                  self.record.coapplicantList.some( function( coapplicant ) {
                    var found = version.coapplicantList.some( function( oldCoapplicant ) {
                      if( oldCoapplicant.name == coapplicant.name ) {
                        // check if an existing coap has been given access to the data
                        if( !oldCoapplicant.access && coapplicant.access ) self.addingCoapplicantWithData = true;
                        return true;
                      }
                    } );

                    // check if a new coap has been given access to the data
                    if( !found && coapplicant.access ) self.addingCoapplicantWithData = true;

                    return self.addingCoapplicantWithData;
                  } );
                }
              }
            }
          },

          getAmendmentTypeList: function( reqnVersionId, object ) {
            var basePath = angular.isDefined( reqnVersionId )
                         ? 'reqn_version/' + reqnVersionId
                         : this.parentModel.getServiceResourcePath()

            if( angular.isUndefined( object ) ) object = this.record;

            // start by setting all amendment types to false
            this.parentModel.amendmentTypeList.en.forEach( function( amendmentType ) {
              var property = 'amendmentType' + amendmentType.id;
              object[property] = false;
            } );

            // now change any which the reqn has to true
            return CnHttpFactory.instance( {
              path: basePath + '/amendment_type',
              data: {
                select: { column: [ 'id' ] },
                modifier: { order: 'id', limit: 1000 }
              }
            } ).query().then( function( response ) {
              response.data.forEach( function( row ) {
                var property = 'amendmentType' + row.id;
                object[property] = true;
              } );
            } );
          },

          toggleAmendmentTypeValue: function( amendmentTypeId ) {
            var promiseList = [];

            var property = 'amendmentType' + amendmentTypeId;
            if( this.record[property] ) {
              if( amendmentTypeId == this.parentModel.newUserAmendmentTypeId ) {
                // show a warning if changing primary applicants

                promiseList.push(
                  CnModalConfirmFactory.instance( {
                    title: self.translate( 'amendment.newUserNoticeTitle'),
                    noText: self.translate( 'misc.no' ),
                    yesText: self.translate( 'misc.yes' ),
                    message: self.translate( 'amendment.newUserNotice' )
                  } ).show().then( response => response )
                );
              }

              // add the amendment type
              return $q.all( promiseList ).then( function( response ) {
                if( 0 == response.length || response[0] ) {
                  return CnHttpFactory.instance( {
                    path: self.parentModel.getServiceResourcePath() + '/amendment_type',
                    data: amendmentTypeId,
                    onError: function( response ) { self.record[property] = !self.record[property]; }
                  } ).post();
                } else {
                  // we're not making the change so un-select the option
                  self.record[property] = !self.record[property];
                }
              } );
            } else {
              // delete the amendment type
              return CnHttpFactory.instance( {
                path: this.parentModel.getServiceResourcePath() +
                  '/amendment_type/' + amendmentTypeId,
                onError: function( response ) { self.record[property] = !self.record[property]; }
              } ).delete();
            }
          },

          getCoapplicantList: function( reqnVersionId, object ) {
            var basePath = angular.isDefined( reqnVersionId )
                         ? 'reqn_version/' + reqnVersionId
                         : this.parentModel.getServiceResourcePath()

            if( angular.isUndefined( object ) ) object = self.record;

            return CnHttpFactory.instance( {
              path: basePath + '/coapplicant',
              data: {
                select: { column: [ 'id', 'name', 'position', 'affiliation', 'email', 'role', 'access' ] },
                modifier: { order: 'id', limit: 1000 }
              }
            } ).query().then( function( response ) {
              object.coapplicantList = response.data;
            } );
          },

          removeCoapplicant: function( id ) {
            return CnHttpFactory.instance( {
              path: this.parentModel.getServiceResourcePath() + '/coapplicant/' + id
            } ).delete().then( function() {
              return self.getCoapplicantList().then( function() { self.determineCoapplicantDiffs(); } );
            } );
          },

          determineReferenceDiffs: function() {
            this.versionList.forEach( version => self.setReferenceDiff( version ) );
          },

          setReferenceDiff: function( version ) {
            if( null != version ) {
              // see if there is a difference between this list and the view's list
              version.referenceDiff =
                version.referenceList.length != self.record.referenceList.length ||
                version.referenceList.some(
                  c1 => !self.record.referenceList.some(
                    c2 => ![ 'rank', 'reference' ].some(
                      prop => c1[prop] != c2[prop]
                    )
                  )
                );
            }
          },

          getReferenceList: function( reqnVersionId, object ) {
            var basePath = angular.isDefined( reqnVersionId )
                         ? 'reqn_version/' + reqnVersionId
                         : this.parentModel.getServiceResourcePath();
            if( angular.isUndefined( object ) ) object = self.record;

            return CnHttpFactory.instance( {
              path: basePath + '/reference',
              data: {
                select: { column: [ 'id', 'rank', 'reference' ] },
                modifier: { order: 'rank', limit: 1000 }
              }
            } ).query().then( function( response ) {
              object.referenceList = response.data;
            } );
          },

          setReferenceRank: function( id, rank ) {
            return CnHttpFactory.instance( {
              path: this.parentModel.getServiceResourcePath() + '/reference/' + id,
              data: { rank: rank }
            } ).patch().then( function() {
              return self.getReferenceList().then( function() { self.determineReferenceDiffs(); } );
            } );
          },

          removeReference: function( id ) {
            return CnHttpFactory.instance( {
              path: this.parentModel.getServiceResourcePath() + '/reference/' + id
            } ).delete().then( function() {
              return self.getReferenceList().then( function() { self.determineReferenceDiffs(); } );
            } );
          },

          getEthicsApprovalList: function() {
            return CnHttpFactory.instance( {
              path: [ 'reqn', self.record.reqn_id, 'ethics_approval' ].join( '/' ),
              data: {
                select: { column: [ 'id', 'filename', 'date', 'one_day_old' ] },
                modifier: { order: { date: true }, limit: 1000 }
              }
            } ).query().then( function( response ) {
              self.record.ethicsApprovalList = response.data;
            } );
          },

          removeEthicsApproval: function( id ) {
            return CnHttpFactory.instance( {
              path: 'ethics_approval/' + id
            } ).delete().then( function() {
              return self.getEthicsApprovalList();
            } );
          },

          downloadEthicsApproval: function( id ) {
            return CnHttpFactory.instance( {
              path: 'ethics_approval/' + id + '?file=filename',
              format: 'unknown'
            } ).file();
          },

          getDataOptionValueList: function( reqnVersionId, object ) {
            var basePath = angular.isDefined( reqnVersionId )
                         ? 'reqn_version/' + reqnVersionId
                         : this.parentModel.getServiceResourcePath()

            if( angular.isUndefined( object ) ) object = self.record;

            object.dataOptionValueList = { bl: [], f1: [] };
            return CnHttpFactory.instance( {
              path: 'data_option',
              data: { select: { column: [ { column: 'MAX(data_option.id)', alias: 'maxId', table_prefix: false } ] } }
            } ).get().then( function( response ) {
              for( var i = 0; i <= response.data[0].maxId; i++ ) {
                object.dataOptionValueList.bl[i] = false;
                object.dataOptionValueList.f1[i] = false;
              }
            } ).then( function() {
              return $q.all( [

                CnHttpFactory.instance( {
                  path: basePath + '/reqn_version_data_option',
                  data: { select: { column: [ 'data_option_id', { table: 'study_phase', column: 'code', alias: 'phase' } ] } }
                } ).query().then( function( response ) {
                  response.data.forEach( function( dataOption ) {
                    if( angular.isDefined( object.dataOptionValueList[dataOption.phase] ) )
                      object.dataOptionValueList[dataOption.phase][dataOption.data_option_id] = true;
                  } );
                } ),

                CnHttpFactory.instance( {
                  path: basePath + '/reqn_version_comment',
                  data: { select: { column: [ 'data_option_category_id', 'description' ] } }
                } ).query().then( function( response ) {
                  response.data.forEach( function( comment ) {
                    var column = 'comment_' + comment.data_option_category_id;
                    object[column] = comment.description;
                    self.backupRecord[column] = object[column];
                  } );
                } ),

                CnHttpFactory.instance( {
                  path: basePath + '/reqn_version_justification',
                  data: { select: { column: [ 'data_option_id', 'description' ] } }
                } ).query().then( function( response ) {
                  response.data.forEach( function( justification ) {
                    var column = 'justification_' + justification.data_option_id;
                    object[column] = justification.description;
                    self.backupRecord[column] = object[column];
                  } );
                } )

              ] );
            } );
          },

          toggleDataOptionValue: function( studyPhaseCode, dataOptionId ) {
            var promiseList = [];

            // get the category and data option objects
            var obj = this.parentModel.getCategoryAndDataOption( dataOptionId );
            var category = obj.category;
            var dataOption = obj.dataOption;

            // when selecting the data-option first check to see if the category or data option have a condition
            if( !self.record.dataOptionValueList[studyPhaseCode][dataOptionId] ) {
              var column = 'condition_' + self.record.lang;

              // create a modal for the category condition, if required
              var categoryModal = null;
              if( null != category[column] ) {
                // see if this is the first option in this category being selected
                var catAlreadySelected = false;
                var categoryOptionIdList = category.optionList.map( o => o.id );

                // see if any of the category's options are already selected
                var alreadySelected = false;
                for( var code in self.record.dataOptionValueList ) {
                  if( categoryOptionIdList.some( id => self.record.dataOptionValueList[code][id] ) ) {
                    alreadySelected = true;
                    break;
                  }
                }

                // only show the condition if none of the options is already selected
                if( !alreadySelected ) {
                  categoryModal = CnModalConfirmFactory.instance( {
                    title: this.translate( 'misc.pleaseConfirm' ),
                    noText: this.translate( 'misc.no' ),
                    yesText: this.translate( 'misc.yes' ),
                    message: category[column]
                  } );
                }
              }

              // create a modal for the option condition, if required
              var optionModal = null != dataOption[column]
                              ?  CnModalConfirmFactory.instance( {
                                   title: self.translate( 'misc.pleaseConfirm' ),
                                   noText: self.translate( 'misc.no' ),
                                   yesText: self.translate( 'misc.yes' ),
                                   message: dataOption[column]
                                 } )
                              : null;

              // now show whichever condition modals are required, category first, then option
              var promiseList = [];
              if( null != categoryModal || null != optionModal ) {
                promiseList.push(
                  null != categoryModal && null != optionModal ?
                  categoryModal.show().then( function( response ) { return response ? optionModal.show() : false; } ) :
                  null != categoryModal ?
                  categoryModal.show() :
                  optionModal.show()
                );
              }
            }

            $q.all( promiseList ).then( function( response ) {
              // don't proceed if the confirm factory says no
              if( 0 == response.length || response[0] ) {
                var justificationColumn = 'justification_' + dataOptionId;

                // toggle the option
                self.record.dataOptionValueList[studyPhaseCode][dataOptionId] =
                  !self.record.dataOptionValueList[studyPhaseCode][dataOptionId];

                if( self.record.dataOptionValueList[studyPhaseCode][dataOptionId] ) {
                  // add the data-option
                  return CnHttpFactory.instance( {
                    path: self.parentModel.getServiceResourcePath() + '/reqn_version_data_option',
                    data: { data_option_id: dataOptionId, study_phase_code: studyPhaseCode },
                    onError: function( response ) {
                      self.record.dataOptionValueList[studyPhaseCode][dataOptionId] =
                        !self.record.dataOptionValueList[studyPhaseCode][dataOptionId];
                    }
                  } ).post().then( function() {
                    // add the local copy of the justification if it doesn't already exist
                    if( dataOption.justification && angular.isUndefined( self.record[justificationColumn] ) )
                      self.record[justificationColumn] = '';
                  } );
                } else {
                  // delete the data-option
                  return CnHttpFactory.instance( {
                    path: self.parentModel.getServiceResourcePath() +
                      '/reqn_version_data_option/data_option_id=' + dataOptionId + ';study_phase_code=' + studyPhaseCode,
                    onError: function( response ) {
                      self.record.dataOptionValueList[studyPhaseCode][dataOptionId] =
                        !self.record.dataOptionValueList[studyPhaseCode][dataOptionId];
                    }
                  } ).delete().then( function() {
                    // delete the local copy of the justification if there are no data options left
                    if( dataOption.justification && angular.isDefined( self.record[justificationColumn] ) ) {
                      var found = false;
                      for( var code in self.record.dataOptionValueList ) {
                        if( self.record.dataOptionValueList[code][dataOptionId] ) {
                          found = true;
                          break;
                        }
                      }

                      if( !found ) delete self.record[justificationColumn];
                    }
                  } );
                }
              }
            } );
          },

          viewData: function() {
            $window.open( CnSession.application.studyDataUrl + '/' + self.record.data_directory, 'studyData' + self.record.reqn_id );
          },

          canViewData: function() {
            // administrators and applicants can view data when in the active stage
            var stage_type = this.record.stage_type ? this.record.stage_type : '';
            return ['administrator','applicant'].includes( CnSession.role.name ) && 'Active' == stage_type;
          },

          getDifferenceList: function( version ) {
            var differenceList = [];
            var mainInputGroup = self.parentModel.module.inputGroupList.findByProperty( 'title', '' );

            if( version.differences.diff ) {
              for( var part in version.differences ) {
                if( !version.differences.hasOwnProperty( part ) || 'diff' == part ) { // used to track overall diff
                  // do nothing
                } else if( 'amendment' == part ) {
                  if( version.differences[part].diff && version.differences[part].a.new_user_id ) {
                    differenceList.push( {
                      name: 'New Primary Applicant',
                      old: null,
                      new: self.formattedRecord.new_user_id
                    } );
                  }
                } else if( version.differences[part].diff ) {
                  for( var section in version.differences[part] ) {
                    if( !version.differences[part].hasOwnProperty( section ) ) continue;
                    if( 'diff' == section ) continue; // used to track overall diff

                    if( version.differences[part][section].diff ) {
                      for( var property in version.differences[part][section] ) {
                        if( !version.differences[part][section].hasOwnProperty( property ) ) continue;
                        if( 'diff' == property ) continue; // used to track overall diff

                        if( angular.isArray( version.differences[part][section][property] ) ) {
                          version.differences[part][section][property].forEach( function( change ) {
                            differenceList.push( {
                              type: property.replace( 'List', '' )
                                            .camelToSnake()
                                            .replace( /_/g, ' ' )
                                            .replace( /[0-9]+/g, ' $&' )
                                            .ucWords(),
                              name: change.name,
                              diff: change.diff
                            } );
                          } );
                        } else {
                          if( version.differences[part][section][property] ) {
                            differenceList.push(
                              angular.isDefined( mainInputGroup.inputList[property] ) &&
                              'text' == mainInputGroup.inputList[property].type ? {
                                name: property.replace( /_/g, ' ' ).ucWords(),
                                diff: 'changed'
                              } : {
                                name: property.replace( /_/g, ' ' ).ucWords(),
                                old: null == version[property] ? '(empty)' : '"' + version[property] + '"',
                                new: null == self.record[property] ? '(empty)' : '"' + self.record[property] + '"'
                              }
                            );
                          }
                        }
                      }
                    }
                  }
                }
              }
            }

            return differenceList;
          },

          submit: function() {
            // used below
            function submitReqn() {
              var parent = self.parentModel.getParentIdentifier();
              return CnHttpFactory.instance( {
                path: parent.subject + '/' + parent.identifier + "?action=submit",
                onError: function( response ) {
                  if( 409 == response.status ) {
                    CnModalMessageFactory.instance( {
                      title: self.translate( 'misc.invalidStartDateTitle' ),
                      message: self.translate( 'misc.invalidStartDateMessage' ),
                      closeText: self.translate( 'misc.close' ),
                      error: true
                    } ).show().then( function() {
                      var element = cenozo.getFormElement( 'start_date' );
                      element.$error.custom = self.translate( 'misc.invalidStartDateTitle' );
                      cenozo.updateFormElement( element, true );
                      self.setFormTab( 0, 'part1', false );
                      self.setFormTab( 1, 'c' );
                    } );
                  } else CnModalMessageFactory.httpError( response );
                }
              } ).patch().then( function() {
                var code = CnSession.user.id == self.record.trainee_user_id ?
                  ( 'deferred' == self.record.state ? 'traineeResubmit' : 'traineeSubmit' ) :
                  ( 'deferred' == self.record.state ? 'resubmit' : 'submit' );
                return CnModalMessageFactory.instance( {
                  title: self.translate( 'misc.' + code + 'Title' ),
                  message: self.translate( 'misc.' + code + 'Message' ),
                  closeText: self.translate( 'misc.close' )
                } ).show().then( function() {
                  return self.parentModel.isRole( 'applicant' ) ?
                    $state.go( 'root.home' ) :
                    self.onView( true ); // refresh
                } );
              } );
            }

            // TODO: either comment why this is here or remove it
            var record = this.record;

            return ( this.record.external ?

              // when submitting an external reqn don't validate and ask which stage to move to
              CnModalSubmitExternalFactory.instance().show().then( function( response ) {
                if( null != response ) {
                  var parent = self.parentModel.getParentIdentifier();
                  return CnHttpFactory.instance( {
                    path: parent.subject + '/' + parent.identifier + '?action=next_stage&stage_type=' + response
                  } ).patch().then( function() {
                    self.onView();
                    return CnModalMessageFactory.instance( {
                      title: 'Requisition moved to "' + response + '" stage',
                      message: 'The external requisition has been moved to the "' + response + '" stage and is now visible ' +
                               'to the applicant.',
                      closeText: 'Close'
                    } ).show().then( function() {
                      return self.onView( true );
                    } );
                  } );
                }
              } ) :

              // when submitting a non-external reqn validate and submit the "regular" way
              CnModalConfirmFactory.instance( {
                title: this.translate( 'misc.pleaseConfirm' ),
                noText: this.translate( 'misc.no' ),
                yesText: this.translate( 'misc.yes' ),
                message: this.translate( 'misc.submitWarning' )
              } ).show().then( function( response ) {
                if( response ) {
                  // make sure that certain properties have been defined, one tab at a time
                  var requiredTabList = {
                    '1a': [ 'applicant_position', 'applicant_affiliation', 'applicant_address', 'applicant_phone' ],
                    '1b': [ 'coapplicant_agreement_filename' ],
                    '1c': [ 'start_date', 'duration' ],
                    '1d': [ 'title', 'keywords', 'lay_summary', 'background', 'objectives', 'methodology', 'analysis' ],
                    '1e': [ 'funding', 'funding_filename', 'funding_agency', 'grant_number' ],
                    '1f': self.record.has_ethics_approval_list ? [ 'ethics' ] : [ 'ethics', 'ethics_filename' ],
                    '2cohort': [ 'tracking', 'comprehensive', 'longitudinal', 'last_identifier' ]
                  };

                  // Now add the data option justifications
                  // We have to do this dynamically because they only exist if their parent data option is selected and
                  // have the "jurisdiction" property
                  for( var property in self.record ) {
                    if( null != property.match( /^justification_/ ) ) {
                      // find which tab the justification belongs to
                      var match = property.match( /^justification_([0-9]+)$/ );
                      var obj = self.parentModel.getCategoryAndDataOption( match[1] );
                      if( obj.dataOption.justification ) {
                        var tab = '2' + obj.category.charCode;

                        // add it to the required tab list
                        if( angular.isUndefined( requiredTabList[tab] ) ) requiredTabList[tab] = [];
                        requiredTabList[tab].push( property );
                      }
                    }
                  }

                  $q.all( self.fileList.map( file => file.updateFileSize() ) ).then( function() {
                    var error = null;
                    var errorTab = null;
                    for( var tab in requiredTabList ) {
                      var firstProperty = null;
                      requiredTabList[tab].filter( function( property ) {
                        if( '1b' == tab ) {
                          // only check 1b properties if there is a new coapplication with access to data
                          return self.addingCoapplicantWithData;
                        } else if( '1e' == tab ) {
                          // only check 1e properties if funding=yes
                          return 'funding' != property ? 'yes' == record.funding : true;
                        } else if( 'ethics_filename' == property ) {
                          // only check the ethics filename if ethics=yes or exempt
                          return ['yes', 'exempt'].includes( record.ethics );
                        } else if( 'last_identifier' == property ) {
                          // only check the last_identifier if longitidunal=yes (it's a boolean var)
                          return record.longitudinal;
                        }

                        // check everything else
                        return true;
                      } ).forEach( function( property ) {
                        var missing = false;
                        if( property.match( '_filename' ) ) {
                          // check for the file size
                          var fileDetails = self.fileList.findByProperty( 'key', property );
                          missing = !angular.isObject( fileDetails ) || 0 == fileDetails.size;
                        } else {
                          // check for the property's value
                          missing = null === record[property] || '' === record[property];
                        }

                        if( missing ) {
                          var element = cenozo.getFormElement( property );
                          element.$error.required = true;
                          cenozo.updateFormElement( element, true );
                          if( null == errorTab ) errorTab = tab;
                          if( null == error ) error = {
                            title: self.translate( 'misc.missingFieldTitle' ),
                            message: self.translate( 'misc.missingFieldMessage' ),
                            error: true
                          };
                        }
                      } );
                    }

                    if( '.' != self.record.amendment ) {
                      // reset the no-amendment-types indicator
                      self.noAmendmentTypes = false;

                      // for amendments make sure that at least one amendment type has been selected
                      if( !self.parentModel.amendmentTypeList.en.some( function( amendmentType ) {
                        var property = 'amendmentType' + amendmentType.id;
                        return self.record[property];
                      } ) ) {
                        self.noAmendmentTypes = true;
                        if( null == errorTab ) errorTab = 'amendment';
                        if( null == error ) error = {
                          title: self.translate( 'misc.missingFieldTitle' ),
                          message: self.translate( 'misc.missingFieldMessage' ),
                          error: true
                        };
                      }

                      // make sure the new user field is filled out when changing the primary applicant
                      if( self.record['amendmentType' + self.parentModel.newUserAmendmentTypeId] && null == record.new_user_id ) {
                        var element = cenozo.getFormElement( 'new_user_id' );
                        element.$error.required = true;
                        cenozo.updateFormElement( element, true );
                        if( null == errorTab ) errorTab = 'amendment';
                        if( null == error ) error = {
                          title: self.translate( 'misc.missingFieldTitle' ),
                          message: self.translate( 'misc.missingFieldMessage' ),
                          error: true
                        };
                      }

                      // make sure the justification is filled out if necessary
                      if( self.amendmentTypeWithJustificationSelected() && null == record.amendment_justification ) {
                        var element = cenozo.getFormElement( 'amendment_justification' );
                        element.$error.required = true;
                        cenozo.updateFormElement( element, true );
                        if( null == errorTab ) errorTab = 'amendment';
                        if( null == error ) error = {
                          title: self.translate( 'misc.missingFieldTitle' ),
                          message: self.translate( 'misc.missingFieldMessage' ),
                          error: true
                        };
                      }
                    }

                    if( null != error ) {
                      // if there was an error then display it now
                      if( 'applicant' == CnSession.role.name ) error.closeText = self.translate( 'misc.close' );
                      CnModalMessageFactory.instance( error ).show().then( function() {
                        if( 'amendment' == errorTab ) {
                          self.setFormTab( 0, 'amendment', false );
                        } else {
                          if( 1 == errorTab.substr( 0, 1 ) ) {
                            self.setFormTab( 0, 'part1', false );
                            self.setFormTab( 1, errorTab.substr( 1 ) );
                          } else {
                            self.setFormTab( 0, 'part2', false );
                            self.setFormTab( 2, errorTab.substr( 1 ) );
                          }
                        }
                      } );
                    } else {
                      // now check to make sure this version is different from the last (the first is always different)
                      return CnHttpFactory.instance( {
                        path: self.parentModel.getServiceResourcePath(),
                        data: { select: { column: 'has_changed' } }
                      } ).get().then( function( response ) {
                        return response.data.has_changed ?
                          // changes have been made, so submit now
                          submitReqn() :
                          // no changes made so warn the user before proceeding
                          CnModalConfirmFactory.instance( {
                            title: self.translate( 'misc.pleaseConfirm' ),
                            noText: self.translate( 'misc.no' ),
                            yesText: self.translate( 'misc.yes' ),
                            message: self.translate( 'misc.noChangesMessage' )
                          } ).show().then( function( response ) {
                            if( response ) return submitReqn();
                          } );
                      } );

                    }
                  } );
                }
              } )
            );
          },

          amend: function() {
            return CnModalConfirmFactory.instance( {
              title: self.translate( 'misc.pleaseConfirm' ),
              noText: self.translate( 'misc.no' ),
              yesText: self.translate( 'misc.yes' ),
              message: self.translate( 'misc.amendWarning' )
            } ).show().then( function( response ) {
              if( response ) {
                var parent = self.parentModel.getParentIdentifier();
                return CnHttpFactory.instance( {
                  path: parent.subject + '/' + parent.identifier + "?action=amend",
                } ).patch().then( function() {
                  // get the new version and transition to viewing it
                  return CnHttpFactory.instance( {
                    path: parent.subject + '/' + parent.identifier,
                    data: {
                      select: {
                        column: {
                          table: 'reqn_version',
                          column: 'id',
                          alias: 'reqn_version_id'
                        }
                      }
                    }
                  } ).get().then( function( response ) {
                    return self.parentModel.transitionToViewState( {
                      getIdentifier: function() { return response.data.reqn_version_id; }
                    } );
                  } );
                } );
              }
            } );
          },

          viewReqn: function() {
            return this.parentModel.transitionToParentViewState( 'reqn', 'identifier=' + this.record.identifier );
          },

          displayReportRequiredWarning: function() {
            return CnModalConfirmFactory.instance( {
              title: self.translate( 'misc.pleaseConfirm' ),
              noText: self.translate( 'misc.no' ),
              yesText: self.translate( 'misc.yes' ),
              message: self.translate( 'misc.reportRequiredWarning' )
            } ).show().then( function( response ) {
              if( response ) self.viewReport()
            } );
          },

          displayNotices: function() {
            var noticeList = [];
            return CnHttpFactory.instance( {
              path: '/reqn/identifier=' + this.record.identifier + '/notice',
              data: { modifier: { order: { datetime: true } } }
            } ).query().then( function( response ) {
              return CnModalNoticeListFactory.instance( {
                title: 'Notice List',
                closeText: self.translate( 'misc.close' ),
                noticeList: response.data
              } ).show();
            } );
          }
        } );

        this.coapplicantModel.metadata.getPromise(); // needed to get the coapplicant's metadata
        this.referenceModel.metadata.getPromise(); // needed to get the reference's metadata
      };
      return { instance: function( parentModel, root ) { return new object( parentModel, root ); } };
    }
  ] );

  /* ######################################################################################################## */
  cenozo.providers.factory( 'CnReqnVersionModelFactory', [
    'CnReqnHelper', 'CnBaseModelFactory', 'CnReqnVersionListFactory', 'CnReqnVersionViewFactory',
    'CnSession', 'CnHttpFactory', '$state', '$q',
    function( CnReqnHelper, CnBaseModelFactory, CnReqnVersionListFactory, CnReqnVersionViewFactory,
              CnSession, CnHttpFactory, $state, $q ) {
      var object = function( type ) {
        var self = this;

        CnBaseModelFactory.construct( this, module );
        this.type = type;
        if( 'lite' != this.type ) this.listModel = CnReqnVersionListFactory.instance( this );

        var misc = CnReqnHelper.lookupData.reqn.misc;
        angular.extend( this, {
          viewModel: CnReqnVersionViewFactory.instance( this, 'root' == this.type ),

          // we'll need to track which amendment type changes the reqn's owner
          newUserAmendmentTypeId: null,
          inputList: {},
          dataOptionCategoryList: [],

          getCategoryAndDataOption: function( dataOptionId ) {
            // get the category and data option objects
            var obj = { category: null, dataOption: null };
            self.dataOptionCategoryList.some( function( cat ) {
              var dataOption = cat.optionList.findByProperty( 'id', dataOptionId );
              if( null != dataOption ) {
                obj.category = cat;
                obj.dataOption = dataOption;
                return true;
              }
              return false;
            } );

            return obj;
          },

          // override the service collection
          getServiceData: function( type, columnRestrictLists ) {
            // Only include the coapplicant_agreement, funding, ethics, data_sharing and agreement filenames in the
            // view type in the lite instance
            return 'lite' == this.type ? {
              select: {
                column: [
                  'is_current_version',
                  'coapplicant_agreement_filename',
                  'funding_filename',
                  'ethics_filename',
                  'data_sharing_filename',
                  'agreement_filename',
                  { table: 'reqn', column: 'state' },
                  { table: 'stage_type', column: 'phase' },
                  { table: 'stage_type', column: 'name', alias: 'stage_type' }
                ]
              }
            } : this.$$getServiceData( type, columnRestrictLists );
          },

          getEditEnabled: function() {
            var is_current_version = this.viewModel.record.is_current_version ? this.viewModel.record.is_current_version : '';
            var phase = this.viewModel.record.phase ? this.viewModel.record.phase : '';
            var state = this.viewModel.record.state ? this.viewModel.record.state : '';
            var stage_type = this.viewModel.record.stage_type ? this.viewModel.record.stage_type : '';

            var check = false;
            if( 'applicant' == CnSession.role.name ) {
              check = 'new' == phase || (
                'deferred' == state && ( 'review' == phase || ( 'lite' == this.type && 'Agreement' == stage_type ) )
              );
            } else if( ['administrator', 'typist'].includes( CnSession.role.name ) ) {
              check = 'new' == phase || (
                'abandoned' != state && ( 'review' == phase || 'Agreement' == stage_type || 'Data Release' == stage_type )
              );
            }

            return this.$$getEditEnabled() && is_current_version && check;
          },

          getDeleteEnabled: function() {
            return this.$$getDeleteEnabled() &&
                   angular.isDefined( this.viewModel.record ) &&
                   'new' == this.viewModel.record.phase;
          },

          setupBreadcrumbTrail: function() {
            var trail = [];

            if( this.isRole( 'applicant' ) ) {
              trail = [
                { title: 'Requisition' },
                { title: this.viewModel.record.identifier }
              ];
            } else {
              trail = [ {
                title: 'Requisitions',
                go: function() { return $state.go( 'reqn.list' ); }
              }, {
                title: this.viewModel.record.identifier,
                go: function() { return $state.go( 'reqn.view', { identifier: 'identifier=' + self.viewModel.record.identifier } ); }
              }, {
                title: 'version ' + this.viewModel.record.amendment_version
              } ];
            }

            CnSession.setBreadcrumbTrail( trail );
          },

          getMetadata: function() {
            return $q.all( [
              $q.all( [
                self.$$getMetadata(),
                CnHttpFactory.instance( {
                  path: 'reqn_version'
                } ).head().then( function( response ) {
                  var columnList = angular.fromJson( response.headers( 'Columns' ) );
                  for( var column in columnList ) {
                    columnList[column].required = '1' == columnList[column].required;
                    if( 'enum' == columnList[column].data_type ) { // parse out the enum values
                      columnList[column].enumList = [];
                      cenozo.parseEnumList( columnList[column] ).forEach( function( item ) {
                        columnList[column].enumList.push( { value: item, name: item } );
                      } );
                    }
                    if( angular.isUndefined( self.metadata.columnList[column] ) )
                      self.metadata.columnList[column] = {};
                    angular.extend( self.metadata.columnList[column], columnList[column] );
                  }

                  return CnHttpFactory.instance( {
                    path: 'amendment_type',
                    data: { modifier: { order: 'rank' } }
                  } ).query().then( function success( response ) {
                    self.amendmentTypeList = { en: [], fr: [] };
                    response.data.forEach( function( item ) {
                      if( item.new_user ) self.newUserAmendmentTypeId = item.id;

                      self.amendmentTypeList.en.push( {
                        id: item.id,
                        newUser: item.new_user,
                        name: item.reason_en,
                        justificationPrompt: item.justification_prompt_en
                      } );
                      self.amendmentTypeList.fr.push( {
                        id: item.id,
                        newUser: item.new_user,
                        name: item.reason_fr,
                        justificationPrompt: item.justification_prompt_fr
                      } );
                    } );
                  } )
                } ),
              ] ).then( function() {
                // only do the following for the root instance
                if( 'root' == self.type ) {
                  // create coapplicant access enum
                  self.metadata.accessEnumList = {
                    en: [ { value: true, name: misc.yes.en }, { value: false, name: misc.no.en } ],
                    fr: [ { value: true, name: misc.yes.fr }, { value: false, name: misc.no.fr } ]
                  };

                  // create generic yes/no enum
                  self.metadata.yesNoEnumList = {
                    en: [ { value: '', name: misc.choose.en }, { value: true, name: misc.yes.en }, { value: false, name: misc.no.en } ],
                    fr: [ { value: '', name: misc.choose.fr }, { value: true, name: misc.yes.fr }, { value: false, name: misc.no.fr } ]
                  };

                  // create duration enums
                  self.metadata.columnList.duration.standardEnumList = {
                    en: [
                      { value: '', name: misc.choose.en },
                      { value: '2 years', name: misc.duration2Years.en },
                      { value: '3 years', name: misc.duration3Years.en }
                    ],
                    fr: [
                      { value: '', name: misc.choose.fr },
                      { value: '2 years', name: misc.duration2Years.fr },
                      { value: '3 years', name: misc.duration3Years.fr }
                    ]
                  };

                  self.metadata.columnList.duration.amendment2EnumList = {
                    en: [
                      { value: '2 years', name: misc.duration2Years.en },
                      { value: '2 years + 1 additional year', name: misc.duration2p1Years.en },
                      { value: '2 years + 2 additional years', name: misc.duration2p2Years.en },
                      { value: '2 years + 3 additional years', name: misc.duration2p3Years.en }
                    ],
                    fr: [
                      { value: '2 years', name: misc.duration2Years.fr },
                      { value: '2 years + 1 additional year', name: misc.duration2p1Years.fr },
                      { value: '2 years + 2 additional years', name: misc.duration2p2Years.fr },
                      { value: '2 years + 3 additional years', name: misc.duration2p3Years.fr }
                    ]
                  };

                  self.metadata.columnList.duration.amendment3EnumList = {
                    en: [
                      { value: '3 years', name: misc.duration3Years.en },
                      { value: '3 years + 1 additional year', name: misc.duration3p1Years.en },
                      { value: '3 years + 2 additional years', name: misc.duration3p2Years.en },
                      { value: '3 years + 3 additional years', name: misc.duration3p3Years.en }
                    ],
                    fr: [
                      { value: '3 years', name: misc.duration3Years.fr },
                      { value: '3 years + 1 additional year', name: misc.duration3p1Years.fr },
                      { value: '3 years + 2 additional years', name: misc.duration3p2Years.fr },
                      { value: '3 years + 3 additional years', name: misc.duration3p3Years.fr }
                    ]
                  };

                  // translate funding enum
                  self.metadata.columnList.funding.enumList = {
                    en: self.metadata.columnList.funding.enumList,
                    fr: angular.copy( self.metadata.columnList.funding.enumList )
                  };
                  self.metadata.columnList.funding.enumList.fr[0].name = misc.yes.fr.toLowerCase();
                  self.metadata.columnList.funding.enumList.fr[1].name = misc.no.fr.toLowerCase();
                  self.metadata.columnList.funding.enumList.fr[2].name = misc.requested.fr.toLowerCase();

                  self.metadata.columnList.funding.enumList.en.unshift( { value: '', name: misc.choose.en } );
                  self.metadata.columnList.funding.enumList.fr.unshift( { value: '', name: misc.choose.fr } );

                  // translate ethics enum
                  self.metadata.columnList.ethics.enumList = {
                    en: self.metadata.columnList.ethics.enumList,
                    fr: angular.copy( self.metadata.columnList.ethics.enumList )
                  };
                  self.metadata.columnList.ethics.enumList.fr[0].name = misc.yes.fr.toLowerCase();
                  self.metadata.columnList.ethics.enumList.fr[1].name = misc.no.fr.toLowerCase();
                  self.metadata.columnList.ethics.enumList.fr[2].name = misc.exempt.fr.toLowerCase();

                  self.metadata.columnList.ethics.enumList.en.unshift( { value: '', name: misc.choose.en } );
                  self.metadata.columnList.ethics.enumList.fr.unshift( { value: '', name: misc.choose.fr } );

                  // translate waiver enum
                  self.metadata.columnList.waiver.enumList.unshift( { value: '', name: misc.none.en } );
                  self.metadata.columnList.waiver.enumList = {
                    en: self.metadata.columnList.waiver.enumList,
                    fr: angular.copy( self.metadata.columnList.waiver.enumList )
                  };
                  self.metadata.columnList.waiver.enumList.en[1].name = misc.traineeFeeWaiver.en;
                  self.metadata.columnList.waiver.enumList.en[2].name = misc.postdocFeeWaiver.en;
                  self.metadata.columnList.waiver.enumList.fr[0].name = misc.none.fr;
                  self.metadata.columnList.waiver.enumList.fr[1].name = misc.traineeFeeWaiver.fr;
                  self.metadata.columnList.waiver.enumList.fr[2].name = misc.postdocFeeWaiver.fr;
                }
              } ),

              // only do the following for the root instance
              'root' != self.type ? $q.all() : $q.all( [
                CnHttpFactory.instance( {
                  path: 'data_option_category',
                  data: {
                    select: { column: [
                      'id',
                      'rank',
                      'comment',
                      'name_en', 'name_fr',
                      'condition_en', 'condition_fr',
                      'note_en', 'note_fr'
                    ] },
                    modifier: { order: 'rank', limit: 1000 }
                  }
                } ).query().then( function( response ) {
                  self.dataOptionCategoryList = response.data;
                  self.dataOptionCategoryList.forEach( function( dataOptionCategory ) {
                    // determine the character code based on the rank
                    dataOptionCategory.charCode = String.fromCharCode( 'a'.charCodeAt(0) + dataOptionCategory.rank - 1 );
                    dataOptionCategory.name = { en: dataOptionCategory.name_en, fr: dataOptionCategory.name_fr };
                    delete dataOptionCategory.name_en;
                    delete dataOptionCategory.name_fr;
                    dataOptionCategory.note = { en: dataOptionCategory.note_en, fr: dataOptionCategory.note_fr };
                    delete dataOptionCategory.note_en;
                    delete dataOptionCategory.note_fr;
                    dataOptionCategory.optionList = [];
                  } );

                  return CnHttpFactory.instance( {
                    path: 'data_option',
                    data: {
                      select: { column: [
                        'id',
                        'data_option_category_id',
                        'justification',
                        'name_en', 'name_fr',
                        'condition_en', 'condition_fr',
                        'note_en', 'note_fr',
                        'bl',
                        'f1'
                      ] },
                      modifier: {
                        order: [ 'data_option_category_id', 'data_option.rank' ],
                        limit: 1000
                      }
                    }
                  } ).query().then( function( response ) {
                    var category = null;
                    response.data.forEach( function( option ) {
                      if( null == category || option.data_option_category_id != category.id )
                        category = self.dataOptionCategoryList.findByProperty( 'id', option.data_option_category_id );

                      option.name = { en: option.name_en, fr: option.name_fr };
                      delete option.name_en;
                      delete option.name_fr;
                      option.note = { en: option.note_en, fr: option.note_fr };
                      delete option.note_en;
                      delete option.note_fr;
                      option.detailCategoryList = [];
                      category.optionList.push( option );
                    } );

                    return CnHttpFactory.instance( {
                      path: 'data_option_detail',
                      data: {
                        select: { column: [ 'id', 'data_option_id', 'name_en', 'name_fr', 'note_en', 'note_fr', 'study_phase_id', {
                          table: 'study_phase',
                          column: 'name',
                          alias: 'study_phase'
                        }, {
                          table: 'data_option',
                          column: 'data_option_category_id'
                        } ] },
                        modifier: {
                          order: [ 'data_option_id', 'study_phase_id', 'data_option_detail.rank' ],
                          limit: 1000
                        }
                      }
                    } ).query().then( function( response ) {
                      var category = null;
                      var option = null;
                      response.data.forEach( function( detail ) {
                        var detailList = {};
                        if( null == category || detail.data_option_category_id != category.id )
                          category = self.dataOptionCategoryList.findByProperty( 'id', detail.data_option_category_id );
                        if( null == option || detail.data_option_id != option.id )
                          option = category.optionList.findByProperty( 'id', detail.data_option_id );

                        detail.name = { en: detail.name_en, fr: detail.name_fr };
                        delete detail.name_en;
                        delete detail.name_fr;
                        detail.note = { en: detail.note_en, fr: detail.note_fr };
                        delete detail.note_en;
                        delete detail.note_fr;
                        var studyPhaseId = detail.study_phase_id;
                        var studyPhase = detail.study_phase;
                        delete detail.study_phase;
                        delete detail.study_phase_id;

                        var studyPhaseFr = misc.baseline.fr;
                        var match = studyPhase.match( /Follow-up ([0-9]+)/ );
                        if( null != match ) {
                          var lookup = 'followup' + match[1];
                          studyPhaseFr = misc[lookup].fr;
                        }

                        var detailCategory = option.detailCategoryList.findByProperty( 'study_phase_id', studyPhaseId );
                        if( detailCategory ) detailCategory.detailList.push( detail );
                        else option.detailCategoryList.push( {
                          study_phase_id: studyPhaseId,
                          name: { en: studyPhase, fr: studyPhaseFr },
                          detailList: [ detail ]
                        } );
                      } );
                    } );
                  } );
                } )
              ] )
            ] );
          }
        } );

        // make the input lists from all groups more accessible
        module.inputGroupList.forEach( group => Object.assign( self.inputList, group.inputList ) );

      };

      return {
        root: new object( 'root' ),
        lite: new object( 'lite' ),
        instance: function() { return new object(); }
      };
    }
  ] );

} );
