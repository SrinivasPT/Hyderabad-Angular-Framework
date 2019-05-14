import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { KendoControlsModule } from '../kendo-controls/kendo-controls.module';
import { DatePickerComponent } from './components/datepicker.component';
import { TextAreaComponent } from './components/textarea.component';
import { TextComponent } from './components/textbox.component';

@NgModule({
  imports: [ReactiveFormsModule, KendoControlsModule],
  exports: [TextComponent, TextAreaComponent, DatePickerComponent],
  declarations: [TextComponent, TextAreaComponent, DatePickerComponent],
  providers: []
})
export class HyderabdInputControlsModule {}
