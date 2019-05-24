import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from '@progress/kendo-angular-dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SessionService } from '../hyderabad-common/services/session.service';
import { FormFieldValidationService } from '../hyderabad-security/services/form-field-validation.service';
import { getComponentNameFromConstructor } from '../hyderabad-utility/common';
import { IEntity } from '../iris-schema';
import { BaseDataService } from './base-data.service';
import { BaseComponent } from './base.component';

@Component({ template: '' })
export class BaseFormDetailComponent<T extends IEntity> extends BaseComponent<T> implements OnInit {
  form: FormGroup;
  // Note: id could be a number or integer. So | operator is used to define id as string or number
  id: number | string;

  protected routeParamName: string; // value always set in child
  protected originalEntity = {} as T; // data before any changes are made
  protected entity: T = {} as T;
  protected sessionService: SessionService;
  protected activatedRoute: ActivatedRoute;
  protected formFieldValidationService: FormFieldValidationService;
  protected dialogService: DialogService;
  protected fb: FormBuilder;

  constructor(protected injector: Injector, protected baseService: BaseDataService<T>) {
    super();
    this.sessionService = this.injector.get(SessionService);
    this.activatedRoute = this.injector.get(ActivatedRoute);
    this.fb = this.injector.get(FormBuilder);
    this.dialogService = this.injector.get(DialogService);
    this.formFieldValidationService = this.injector.get(FormFieldValidationService);
    this.entity = this.setEntityInstance();
  }

  protected setEntityInstance(data: any = {}): T {
    return {} as T;
  }
  // protected abstract setEntityInstance(): T;

  ngOnInit() {
    this.form = this.fb.group({ ...this.entity });

    this.setupFormValidations();

    this.activatedRoute.data.subscribe((pageData: { data: T }) => {
      this.entity = this.baseService.parse(pageData.data as T);
      this.originalEntity = Object.assign({}, this.entity);
      this.form.patchValue(this.entity);
      this.additionalFormInitialize();
    });
  }

  protected setupFormValidations() {
    const componentName = getComponentNameFromConstructor(this.constructor.name);
    this.formFieldValidationService.setupForm(componentName, this.form);
  }

  protected additionalFormInitialize() {
    // hook for child
  }

  hasChanged() {
    const isChanged = JSON.stringify(this.form.value) === JSON.stringify(this.originalEntity) ? false : true;
    return isChanged;
  }

  // used by canDeactive route guard

  canDeactivate(): Observable<boolean> | boolean {
    if (!this.hasChanged()) {
      return true;
    }

    // Note: Here I wasteed couple of hours as I was not returning the observable.
    // Also converting the DialogResult to boolean also took some time.
    // Finally was able to figure out that map should be used to transform the observable.
    return (
      this.dialogService
        .open({
          title: 'Confirmation?',
          content: 'Form data changed. Do you want to save the changes?',
          actions: [{ text: 'Yes', primary: true }, { text: 'No' }],
          width: 450,
          height: 200,
          minWidth: 250
        })
        // tslint:disable-next-line: no-string-literal
        .result.pipe(map(result => (result['primary'] ? false : true)))
    );
  }

  save() {
    // Value of dataService set in the child to support different APIs
    // Optionally override saveEntity in the child
    // return this.updateService.update(this.dataService, this.saveEntity).then( . . .;
  }
}
