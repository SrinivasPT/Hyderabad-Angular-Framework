import { Injectable } from '@angular/core';
import { isNil } from 'ramda';

@Injectable({ providedIn: 'root' })
export class CustomControlsService {
  constructor() {}

  public getLabel(formControlName: string, label: string): string {
    console.log((formControlName.charAt(0).toUpperCase() + formControlName.slice(1)).split(/(?=[A-Z])/).join(' '));
    label = isNil(label) ? (formControlName.charAt(0).toUpperCase() + formControlName.slice(1)).split(/(?=[A-Z])/).join(' ') : label;
    return label;
  }
}
