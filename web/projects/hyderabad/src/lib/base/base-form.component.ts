import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
  protected formDataOriginal = {} as T; // data before any changes are made
  protected formData = {} as T;
  dialogService = this.sessionService.dialogService;

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

    this.activatedRoute.data.subscribe((pageData: { pageData: T }) => {
      this.formData = pageData.pageData;
      this.formDataOriginal = Object.assign({}, this.formData);
      this.form.patchValue(this.formData);
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
    const isChanged = JSON.stringify(this.form.value) === JSON.stringify(this.formDataOriginal) ? false : true;
    return isChanged;
  }

  // used by canDeactive route guard

  canDeactivate(): Observable<boolean> | boolean {
    if (!this.hasChanged()) {
      return true;
    }

    return this.dialogService
      .open({
        title: 'Confirmation?',
        content: 'Form data changed. Do you want to save the changes?',
        actions: [{ text: 'Yes', primary: true }, { text: 'No' }],
        width: 450,
        height: 200,
        minWidth: 250
      })
      .result.pipe(map(result => (result['primary'] ? false : true)));
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
    return this.formData;
  }

  // Use in child HTML template to limit functionality
  get editAllowed() {
    // updatePermission could be overridden in the child
    // return this.authorizationService.hasPermission(this.updatePermission);
    return true;
  }
}
