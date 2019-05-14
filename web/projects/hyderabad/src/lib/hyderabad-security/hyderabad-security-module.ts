import { NgModule } from '@angular/core';
import { HyderabadCommonModule } from '../hyderabad-common/hyderabad-common.module';
import { AuthGuard } from './guards/auth.guard';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';

@NgModule({
  imports: [HyderabadCommonModule],
  exports: [],
  declarations: [AuthGuard, CanDeactivateGuard],
  providers: []
})
export class HyderabadSecurityModule {}
