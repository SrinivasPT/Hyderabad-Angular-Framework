import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { KendoControlsModule } from '../kendo-controls/kendo-controls.module';
import { GridComponent } from './components/grid.component';

@NgModule({
  imports: [ReactiveFormsModule, KendoControlsModule],
  exports: [GridComponent],
  declarations: [GridComponent],
  providers: []
})
export class HyderabadGridModule {}
