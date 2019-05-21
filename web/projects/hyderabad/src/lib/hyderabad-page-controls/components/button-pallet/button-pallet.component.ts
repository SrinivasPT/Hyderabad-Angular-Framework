import { Component, OnInit } from '@angular/core';
import { map, split, toLower, toUpper } from 'ramda';
import { concat } from 'rxjs';

export class ButtonPallet {
  code: string;
  label: string;
}

@Component({
  selector: 'hyd-button-pallet',
  template: `
    <div class="k-block">
      <ng-container *ngFor="let button of buttons">
        <button kendoButton (click)="onUserAction(button.toUpper())">{{ button }}</button>
      </ng-container>
    </div>
  `
})
export class ButtonPalletComponent implements OnInit {
  public buttons = ['ADD_NEW', 'EDIT', 'SAVE', 'BACK_TO_LIST'];

  constructor() {}

  ngOnInit() {}

  onUserAction(action: string) {
    console.log(action);
  }

  getButtonLabels(buttons: string[]) {
    const capitalCaseForWord = val => concat(toUpper(val.charAt(0)), toLower(val.slice(1)));
    const capitalCaseForButton = val => map(capitalCaseForWord, split('_', val)).join(' ');
    return map(capitalCaseForButton, buttons);
  }
}
