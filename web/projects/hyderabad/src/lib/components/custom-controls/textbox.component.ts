import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomControlsService } from 'src/app/sample/person-detail/custom-control.service';

@Component({
  selector: 'hyd-textbox',
  template: `
    <div [formGroup]='group'>
      <label class="k-form-field">
        <span>{{ label }}</span>
        <input class="k-textbox" placeholder="Your Name" [formControlName]='frmControlName' />
      </label>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextComponent implements OnInit {
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
