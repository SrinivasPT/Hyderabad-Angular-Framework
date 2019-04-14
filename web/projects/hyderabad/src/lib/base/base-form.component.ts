import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEntity } from 'hyderabad';
import { AppInjector } from './app-injector.service';
import { BaseComponent } from './base.component';

@Component({
  template: ''
})
export class BaseFormComponent extends BaseComponent implements OnInit {
  updatePermission = 'UPDATE_FULL'; // Can override in child component

  protected routeParamName: string; // value always set in child
  protected entity: IEntity; // data on the form
  protected original: IEntity; // data before any changes are made
  // protected dataService: EntityDataService; // service with http methods
  // protected updateService: UpdateService;
  // protected authorizationService: AuthorizationService;

  // @ViewChild('confirmationDialog') confirmationDialog: ConfirmDialogComponent;

  constructor(protected route: ActivatedRoute) {
    super(); // call parent constructor
    const injector = AppInjector.getInjector();
    // this.updateService = injector.get(UpdateService);
    // this.authorizationService = injector.get(AuthorizationService);
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      // data from route resolver
      this.entity = data[this.routeParamName]; // routeParamName from child
      this.additionalFormInitialize(); // optional initialization in child
    });
  }

  protected additionalFormInitialize() {
    // hook for child
  }

  // Child could override this method for alternate implementation

  hasChanged() {
    return JSON.stringify(this.original) === JSON.stringify(this.entity) ? true : false;
  }

  // used by canDeactive route guard

  canDeactivate() {
    if (!this.hasChanged()) {
      return true;
    }
    // return this.showConfirmationDialog().then(choice => {
    //   // return choice !== ConfirmChoice.cancel;
    //   return true;
    // });
  }

  // showConfirmationDialog() {
  //   return new Promise((resolve) => {
  //       this.confirmationDialog.show();
  //       this.save().then(() => {
  //       }, (err) => {
  //           this.logError(err); // Implemented in base parent component
  //       });
  //   });
  // }

  save() {
    // Value of dataService set in the child to support different APIs
    // Optionally override saveEntity in the child
    // return this.updateService.update(this.dataService, this.saveEntity).then( . . .;
  }

  protected get saveEntity() {
    return this.entity;
  }

  // Use in child HTML template to limit functionality
  get editAllowed() {
    // updatePermission could be overridden in the child
    // return this.authorizationService.hasPermission(this.updatePermission);
    return true;
  }
}
