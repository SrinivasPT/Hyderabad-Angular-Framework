import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'hyd-textbox',
  template: `
    <div [formGroup]='group'>
      <label>{{ label }}</label>
      <input
        type="text"
        [formControlName]='frmControlName'>
    </div>
  `
})
export class TextComponent {
  @Input()
  group: FormGroup;
  @Input()
  label: string;
  @Input()
  frmControlName: string;
}
