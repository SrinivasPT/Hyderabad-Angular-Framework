import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'hyderabad-logger';
import { concat, map, split, toLower, toUpper } from 'ramda';

export class ButtonPallet {
  code: string;
  label: string;
}

@Component({
  selector: 'hyd-button-pallet',
  template: `
    <div class="k-block">
      <ng-container *ngFor="let config of buttonConfig">
        <button kendoButton (click)="onUserAction(config.code)">{{ config.value }}</button>
      </ng-container>
    </div>
  `
})
export class ButtonPalletComponent implements OnInit {
  public buttonCodes = ['ADD_NEW', 'EDIT', 'SAVE', 'BACK_TO_LIST'];
  public buttonConfig = [];

  constructor(private logger: NGXLogger) {}

  ngOnInit() {
    // this.buttonConfig = this.generateButtonConfig(this.buttonCodes);
    this.enableButtons();
    this.logger.log('ButtonPalletComponent::ngOnInit', 'Button Config', this.buttonConfig);
  }

  onUserAction(action: string) {
    this.enableButtonsBasedOnUserAction(action);
    console.log(action);
  }

  enableButtons(buttons: string[] = this.buttonCodes) {
    this.buttonConfig = this.generateButtonConfig(buttons);
  }

  enableButtonsBasedOnUserAction(action: string) {
    let buttonsToEnable = [];
    switch (action) {
      case 'ADD_NEW':
        buttonsToEnable = ['SAVE', 'CANCEL'];
        break;
      case 'EDIT':
        buttonsToEnable = ['SAVE', 'CANCEL'];
        break;
      case 'SAVE':
        buttonsToEnable = ['ADD_NEW', 'EDIT', 'SAVE', 'BACK_TO_LIST', 'CANCEL'];
        break;
      case 'CANCEL':
        buttonsToEnable = ['ADD_NEW', 'EDIT', 'SAVE', 'BACK_TO_LIST', 'CANCEL'];
        break;
      default:
        this.logger.warn('enableButtonsBasedOnUserAction', 'Incorrect User Action Came in');
    }
    this.enableButtons(buttonsToEnable);
  }

  generateButtonConfig(buttonCodes: any[]): any[] {
    const capitalCaseForWord = val => concat(toUpper(val.charAt(0)), toLower(val.slice(1)));
    const capitalCaseForWords = val => map(capitalCaseForWord, split('_', val)).join(' ');
    return buttonCodes.map(
      (curVal, index, array) => (array[index] = { code: curVal, value: capitalCaseForWords(curVal), permVal: Math.pow(2, index) })
    );
  }
}
