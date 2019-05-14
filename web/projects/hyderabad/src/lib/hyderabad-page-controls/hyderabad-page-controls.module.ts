import { NgModule } from '@angular/core';
import { FooterBarComponent } from './components/footer-bar/footer-bar.component';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  imports: [],
  exports: [FooterBarComponent, HeaderBarComponent, PageNotFoundComponent],
  declarations: [FooterBarComponent, HeaderBarComponent, PageNotFoundComponent],
  providers: []
})
export class HyderabadPageControlsModule {}
