import { NgModule } from '@angular/core';
import { HyderabadCommonModule } from '../hyderabad-common/hyderabad-common.module';
import { FormFieldPermissionDirective } from './directives/form-field-permission.directive';

@NgModule({
  imports: [HyderabadCommonModule],
  exports: [FormFieldPermissionDirective],
  declarations: [FormFieldPermissionDirective],
  providers: []
})
export class HyderabadSecurityModule {}
