import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseDataService } from '../services/base-data.service';
import { SessionService } from '../services/session.service';
import { BaseComponent } from './base.component';

@Component({
  template: ''
})
export abstract class BaseFormComponent<T> extends BaseComponent<T> implements OnInit {
  form: FormGroup;
  id: string;
  updatePermission = 'UPDATE_FULL'; // Can override in child component

  protected routeParamName: string; // value always set in child
  protected entity = {} as T; // data on the form
  protected original = {} as T; // data before any changes are made
  protected formData = {} as T;

  fb = this.sessionService.fb;

  constructor(
    protected sessionService: SessionService,
    protected baseService: BaseDataService<T>,
    protected activatedRoute: ActivatedRoute
  ) {
    super(sessionService, baseService);
    this.formData = this.setEntityInstance();
  }

  abstract setEntityInstance(): T;

  ngOnInit() {
    this.form = this.fb.group({ ...this.formData });
    this.loadData(this.id);
    this.activatedRoute.data.subscribe(data => {
      this.entity = data[this.routeParamName]; // routeParamName from child
      this.additionalFormInitialize(); // optional initialization in child
    });
  }

  loadData(id: string) {
    this.baseService.get(id).subscribe(data => {
      this.formData = data;
      this.form.patchValue(data);
      console.log(data);
    });
  }

  protected additionalFormInitialize() {
    // hook for child
  }

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
