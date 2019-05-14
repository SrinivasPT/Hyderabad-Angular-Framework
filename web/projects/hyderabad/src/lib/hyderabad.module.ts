import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HyderabadBaseModule } from 'hyderabad-base';
import { HyderabadMessagesModule } from 'hyderabad-messages';
import { PrettyPrintPipe } from './hyderabad-debug-controls/pipes/pretty-print.pipe';
import { HyderabadGridModule } from './hyderabad-grid/hyderabad-grid.module';
import { HyderabdInputControlsModule } from './hyderabad-input-controls/hyderabad-input-controls.module';
import { FooterBarComponent } from './hyderabad-page-controls/components/footer-bar/footer-bar.component';
import { HeaderBarComponent } from './hyderabad-page-controls/components/header-bar/header-bar.component';
import { PageNotFoundComponent } from './hyderabad-page-controls/components/page-not-found/page-not-found.component';
import { KendoControlsModule } from './kendo-controls/kendo-controls.module';

@NgModule({
  declarations: [HeaderBarComponent, FooterBarComponent, PageNotFoundComponent, PrettyPrintPipe],
  imports: [CommonModule, KendoControlsModule, HyderabadBaseModule, HyderabadMessagesModule],
  exports: [
    KendoControlsModule,
    HyderabadBaseModule,
    HyderabadMessagesModule,
    HyderabdInputControlsModule,
    HyderabadGridModule,
    HeaderBarComponent,
    FooterBarComponent,
    PageNotFoundComponent,
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
