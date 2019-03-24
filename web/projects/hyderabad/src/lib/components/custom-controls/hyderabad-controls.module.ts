import { NgModule } from '@angular/core';
import { TextComponent } from './textbox.component';
import { ReactiveFormsModule } from '@angular/forms';
import { KendoControlsModule } from '../../kendo-controls/kendo-controls.module';
import { TextAreaComponent } from './textarea.component';
import { DatePickerComponent } from './datepicker.component';

@NgModule({
  imports: [ReactiveFormsModule, KendoControlsModule],
  exports: [TextComponent, TextAreaComponent, DatePickerComponent],
  declarations: [TextComponent, TextAreaComponent, DatePickerComponent],
  providers: [],
})
export class HyderabadControlsModule { }

