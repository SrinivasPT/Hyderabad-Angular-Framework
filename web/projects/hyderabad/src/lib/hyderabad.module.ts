import { NgModule, ModuleWithProviders } from '@angular/core';
import { HyderabadComponent } from './hyderabad.component';
import { HeaderBarComponent } from './components/page/header-bar/header-bar.component';
import { FooterBarComponent } from './components/page/footer-bar/footer-bar.component';
import { KendoControlsModule } from './kendo-controls/kendo-controls.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MessagesComponent } from './components/messages/messages.component';
import { HyderabadControlsModule } from './components/custom-controls/hyderabad-controls.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [HyderabadComponent, HeaderBarComponent, FooterBarComponent, PageNotFoundComponent, MessagesComponent],
  imports: [CommonModule, KendoControlsModule],
  exports: [KendoControlsModule, HyderabadControlsModule, HyderabadComponent, HeaderBarComponent, FooterBarComponent, PageNotFoundComponent]
})
export class HyderabadModule {
  public static forRoot(environment: any): ModuleWithProviders {
    return {
      ngModule: HyderabadModule,
      providers: [{ provide: 'environment', useValue: environment }]
    };
  }
}
