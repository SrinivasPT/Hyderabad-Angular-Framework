import { Component, Injector, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DialogContentBase, DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { NGXLogger } from 'hyderabad-logger';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SessionService } from '../hyderabad-common/services/session.service';
import { FormFieldValidationService } from '../hyderabad-security/services/form-field-validation.service';
import { IEntity } from '../iris-schema';
import { getComponentNameFromConstructor } from '../utility/common';
import { BaseDataService } from './base-data.service';

@Component({ template: '' })
export class BaseFormDetailDialogComponent<T extends IEntity> extends DialogContentBase implements OnInit {
  protected form: FormGroup;
  @Input() public formData: T;
  // Note: id could be a number or integer. So | operator is used to define id as string or number
  id: number | string;

  protected routeParamName: string; // value always set in child
  protected originalEntity = {} as T; // data before any changes are made
  protected entity: T = {} as T;
  protected sessionService: SessionService;
  protected logger: NGXLogger;
  protected activatedRoute: ActivatedRoute;
  protected formFieldValidationService: FormFieldValidationService;
  protected dialogService: DialogService;
  protected fb: FormBuilder;
  protected className = () => this.constructor.name;

  constructor(protected injector: Injector, protected baseService: BaseDataService<T>) {
    super(injector.get(DialogRef));
    this.sessionService = this.injector.get(SessionService);
    this.logger = this.injector.get(NGXLogger);
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

    this.baseService.get(this.formData.id).subscribe((data: T) => {
      this.logger.debug(this.className, 'ngOnInit', data);
      this.entity = this.baseService.parse(data);
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
