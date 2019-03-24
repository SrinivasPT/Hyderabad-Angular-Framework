import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomControlsService } from 'src/app/sample/person-detail/custom-control.service';

@Component({
  selector: 'hyd-datepicker',
  template: `
    <div [formGroup]='group'>
      <label class="k-form-field">
        <span>{{ label }}</span>
        <kendo-datepicker [formControlName]='frmControlName'></kendo-datepicker>
      </label>
    </div>
  `
})
export class DatePickerComponent implements OnInit{
  @Input()
  group: FormGroup;
  @Input()
  label: string;
  @Input()
  frmControlName: string;

  constructor(public ccService: CustomControlsService) { }

  ngOnInit() {
    this.label = (this.label === undefined) ?  this.ccService.getLabel(this.frmControlName, this.label) : this.label;
  }
}
