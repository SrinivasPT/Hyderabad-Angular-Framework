import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HyderabadBaseModule } from 'hyderabad-base';
import { HyderabadMessagesModule } from 'hyderabad-messages';
import { PrettyPrintPipe } from './hyderabad-debug-controls/pipes/pretty-print.pipe';
import { HyderabadGridModule } from './hyderabad-grid/hyderabad-grid.module';
import { HyderabdInputControlsModule } from './hyderabad-input-controls/hyderabad-input-controls.module';
import { HyderabadPageControlsModule } from './hyderabad-page-controls/hyderabad-page-controls.module';
import { KendoControlsModule } from './kendo-controls/kendo-controls.module';

@NgModule({
  declarations: [PrettyPrintPipe],
  imports: [CommonModule, KendoControlsModule, HyderabadBaseModule, HyderabadMessagesModule, HyderabadPageControlsModule],
  exports: [
    KendoControlsModule,
    HyderabadBaseModule,
    HyderabadMessagesModule,
    HyderabdInputControlsModule,
    HyderabadPageControlsModule,
    HyderabadGridModule,
    PrettyPrintPipe
  ]
})
export class HyderabadModule {
  public static forRoot(environment: any): ModuleWithProviders {
    return {
      ngModule: HyderabadModule,
      providers: [{ provide: 'environment', useValue: environment }]
    };
  }
}
