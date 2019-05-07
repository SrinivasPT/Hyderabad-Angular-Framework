import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HyderabadControlsModule } from './components/custom-controls/hyderabad-controls.module';
import { GridComponent } from './components/grid/grid.component';
import { MessagesComponent } from './components/messages/messages.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FooterBarComponent } from './components/page/footer-bar/footer-bar.component';
import { HeaderBarComponent } from './components/page/header-bar/header-bar.component';
import { HyderabadComponent } from './hyderabad.component';
import { KendoControlsModule } from './kendo-controls/kendo-controls.module';
import { PrettyPrintPipe } from './pipes/pretty-print.pipe';

@NgModule({
  declarations: [
    HyderabadComponent,
    HeaderBarComponent,
    FooterBarComponent,
    PageNotFoundComponent,
    MessagesComponent,
    PrettyPrintPipe,
    GridComponent
  ],
  imports: [CommonModule, KendoControlsModule],
  exports: [
    KendoControlsModule,
    HyderabadControlsModule,
    HyderabadComponent,
    HeaderBarComponent,
    FooterBarComponent,
    PageNotFoundComponent,
    PrettyPrintPipe,
    GridComponent
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
