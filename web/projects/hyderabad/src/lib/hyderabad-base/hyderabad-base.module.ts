import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseFormDetailComponent } from './base-form-detail.component';
import { BaseFormListComponent } from './base-form-list.component';
import { BaseFormHomeComponent } from './base.home.component';

@NgModule({
  imports: [ReactiveFormsModule],
  exports: [BaseFormDetailComponent, BaseFormListComponent, BaseFormHomeComponent],
  declarations: [BaseFormDetailComponent, BaseFormListComponent, BaseFormHomeComponent],
  providers: []
})
export class HyderabadBaseModule {}
