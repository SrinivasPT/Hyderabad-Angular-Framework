import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseFormDetailComponent } from './base-form-detail.component';
import { BaseFormHomeComponent } from './base.home.component';

@NgModule({
  imports: [ReactiveFormsModule],
  exports: [BaseFormDetailComponent,  BaseFormHomeComponent],
  declarations: [BaseFormDetailComponent,  BaseFormHomeComponent],
  providers: []
})
export class HyderabadBaseModule {}
