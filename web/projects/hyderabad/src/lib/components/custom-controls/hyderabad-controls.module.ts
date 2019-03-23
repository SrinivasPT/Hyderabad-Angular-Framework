import { NgModule } from '@angular/core';
import { TextComponent } from './textbox.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [ReactiveFormsModule],
  exports: [TextComponent],
  declarations: [TextComponent],
  providers: [],
})
export class HyderabadControlsModule { }

