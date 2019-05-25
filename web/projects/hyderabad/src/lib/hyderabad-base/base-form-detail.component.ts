import { AfterViewInit, Component, ElementRef, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from '@progress/kendo-angular-dialog';
import { CustomDialogService } from 'hyderabad-common';
import { NGXLogger } from 'hyderabad-logger';
import { clone } from 'ramda';
import { Observable } from 'rxjs';
import { SessionService } from '../hyderabad-common/services/session.service';
import { FormFieldValidationService } from '../hyderabad-security/services/form-field-validation.service';
import { getComponentNameFromConstructor } from '../hyderabad-utility/common';
import { IEntity } from '../iris-schema';
import { BaseDataService } from './base-data.service';
import { BaseComponent } from './base.component';

@Component({ template: '' })
export class BaseFormDetailComponent<T extends IEntity> extends BaseComponent<T> implements OnInit, AfterViewInit {
  form: FormGroup;
  protected fb: FormBuilder;
  // Note: id could be a number or integer. So | operator is used to define id as string or number
  protected id: number | string;
  protected originalEntity = {} as T; // data before any changes are made
  protected entity: T = {} as T;
  protected componentName = getComponentNameFromConstructor(this.constructor.name);
  //#region Services Declarations
  protected sessionService: SessionService;
  protected customDialogService: CustomDialogService;
  protected activatedRoute: ActivatedRoute;
  protected formFieldValidationService: FormFieldValidationService;
  protected dialogService: DialogService;
  protected logger: NGXLogger;
  protected elementRef: ElementRef;
  //#endregion

  constructor(protected injector: Injector, protected baseService: BaseDataService<T>) {
    super();
    this.entity = this.setEntityInstance();
    //#region Service Initialization
    this.sessionService = this.injector.get(SessionService);
    this.activatedRoute = this.injector.get(ActivatedRoute);
    this.fb = this.injector.get(FormBuilder);
    this.customDialogService = this.injector.get(CustomDialogService);
    this.formFieldValidationService = this.injector.get(FormFieldValidationService);
    this.logger = this.injector.get(NGXLogger);
    this.elementRef = this.injector.get(ElementRef);
    //#endregion
  }

  protected setEntityInstance(data: any = {}): T {
    return {} as T;
  }

  ngOnInit() {
    this.form = this.fb.group(this.entity);
    this.setupFormValidations();
    this.activatedRoute.data.subscribe((pageData: { data: T }) => {
      this.refresh(pageData);
      this.additionalFormInitialize();
    });
  }

  ngAfterViewInit() {
    this.log('ngAfterViewInit', 'Removing the hidden fields');
    this.formFieldValidationService.removeHiddenFields(this.componentName, this.elementRef, this.form);
  }

  private log(methodName: string, message: string) {
    this.logger.log(this.constructor.name, methodName, message);
  }

  private refresh(pageData: { data: T }) {
    this.entity = this.baseService.parse(pageData.data as T);
    this.originalEntity = clone(this.entity);
    this.form.patchValue(this.entity);
  }

  protected setupFormValidations() {
    this.formFieldValidationService.setupForm(this.componentName, this.form);
  }

  protected additionalFormInitialize() {
    // hook for child
  }

  hasChanged() {
    const isChanged = JSON.stringify(this.form.value) === JSON.stringify(this.originalEntity) ? false : true;
    return isChanged;
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (!this.hasChanged()) {
      return true;
    }

    return this.customDialogService.showFormDeactivateConfirmation();
  }

  protected preSave() {}

  protected postSave() {}

  save() {
    this.preSave();
    this.baseService.save(this.entity).subscribe();
    this.postSave();
  }
}
