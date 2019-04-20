import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomControlsService } from 'projects/hyderabad/src/lib/services/custom-control.service';

@Component({
  selector: 'hyd-textarea',
  template: `
    <div [formGroup]="group">
      <label class="k-form-field">
        <span>{{ label }}</span>
        <textarea kendoTextArea [autoSize]="false" [formControlName]="frmControlName"></textarea>
      </label>
    </div>
  `
})
export class TextAreaComponent implements OnInit {
  @Input()
  group: FormGroup;
  @Input()
  label: string;
  @Input()
  frmControlName: string;

  constructor(public ccService: CustomControlsService) {}

  ngOnInit() {
    this.label = this.label === undefined ? this.ccService.getLabel(this.frmControlName, this.label) : this.label;
  }
}
