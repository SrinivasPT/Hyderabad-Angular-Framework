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
        <button kendoButton *ngIf="true" (click)="onUserAction(config.code)">{{ config.value }}</button>
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
    this.enableButtons(['ADD_NEW', 'SAVE']);
  }

  onUserAction(action: string) {
    console.log(action);
  }

  enableButtons(buttons: string[] = this.buttonCodes) {
    this.buttonConfig = this.generateButtonConfig(buttons);
  }

  generateButtonConfig(buttonCodes: any[]): any[] {
    const capitalCaseForWord = val => concat(toUpper(val.charAt(0)), toLower(val.slice(1)));
    const capitalCaseForWords = val => map(capitalCaseForWord, split('_', val)).join(' ');
    return buttonCodes.map(
      (curVal, index, array) => (array[index] = { code: curVal, value: capitalCaseForWords(curVal), permVal: Math.pow(2, index) })
    );
  }
}
