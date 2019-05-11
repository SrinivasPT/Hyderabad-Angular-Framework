import { Injectable } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import * as R from 'ramda';
import { FieldValidationRule, FormFieldValidationErrorMessage } from '../iris-schema';
import { BaseDataService } from './base-data.service';
import { SessionService } from './session.service';

@Injectable({ providedIn: 'root' })
export class FormFieldValidationService extends BaseDataService<FieldValidationRule> {
  constructor(public sessionService: SessionService) {
    super(sessionService);
  }

  setupForm(componentName: string, form: FormGroup) {
    this.get(componentName).subscribe((validations: FieldValidationRule[]) => {
      validations.forEach(validation => this.setFormField(validation, form));
    });
  }

  setFormField(fieldValidationRule: FieldValidationRule, form: FormGroup) {
    // Note: Using the intermediate variable which will help while debugging (?)0+
    const formControl = form.get(fieldValidationRule.fieldName);
    const validationRules = this.getValidationRules(fieldValidationRule);
    formControl.setValidators(validationRules);
    formControl.updateValueAndValidity();
  }

  getValidationRules(fieldValidationRule: FieldValidationRule): any[] {
    const validationsArray = [];

    R.isNil(fieldValidationRule.max) ? R.identity(1) : validationsArray.push(Validators.max(fieldValidationRule.max));
    R.isNil(fieldValidationRule.min) ? R.identity(1) : validationsArray.push(Validators.min(fieldValidationRule.min));
    R.isNil(fieldValidationRule.maxLength) ? R.identity(1) : validationsArray.push(Validators.maxLength(fieldValidationRule.maxLength));
    R.isNil(fieldValidationRule.minLength) ? R.identity(1) : validationsArray.push(Validators.minLength(fieldValidationRule.minLength));
    R.isNil(fieldValidationRule.email) ? R.identity(1) : validationsArray.push(Validators.email);
    R.isNil(fieldValidationRule.pattern) ? R.identity(1) : validationsArray.push(Validators.pattern(fieldValidationRule.pattern));
    !R.isNil(fieldValidationRule.required) && fieldValidationRule.required ? validationsArray.push(Validators.required) : R.identity(0);

    return validationsArray;
  }

  getFormValidationErrors(componentName: string, form: FormGroup): FormFieldValidationErrorMessage[] {
    const validationErrors: FormFieldValidationErrorMessage[] = [];
    this.get(componentName).subscribe((validations: FieldValidationRule[]) => {
      validations.forEach(validation => {
        const errorMessage = form.get(validation.fieldName).invalid ? validation.errorMessage : R.identity('');
        validationErrors.push(new FormFieldValidationErrorMessage(validation.fieldName, validation.fieldName, errorMessage));
      });
    });
    return validationErrors;
  }
}
