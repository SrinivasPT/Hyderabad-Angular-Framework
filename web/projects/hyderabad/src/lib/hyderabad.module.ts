import { NgModule, ModuleWithProviders } from '@angular/core';
import { HyderabadComponent } from './hyderabad.component';
import { HeaderBarComponent } from './components/page/header-bar/header-bar.component';
import { FooterBarComponent } from './components/page/footer-bar/footer-bar.component';
import { KendoControlsModule } from './kendo-controls/kendo-controls.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MessagesComponent } from './components/messages/messages.component';

@NgModule({
  declarations: [HyderabadComponent, HeaderBarComponent, FooterBarComponent, PageNotFoundComponent, MessagesComponent],
  imports: [KendoControlsModule],
  exports: [KendoControlsModule, HyderabadComponent, HeaderBarComponent, FooterBarComponent, PageNotFoundComponent]
})
export class HyderabadModule {
  public static forRoot(environment: any): ModuleWithProviders {
    return {
      ngModule: HyderabadModule,
      providers: [{ provide: 'environment', useValue: environment }]
    };
  }
}
