import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonPalletComponent } from './components/button-pallet/button-pallet.component';
import { FooterBarComponent } from './components/footer-bar/footer-bar.component';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  imports: [CommonModule],
  exports: [FooterBarComponent, HeaderBarComponent, PageNotFoundComponent, ButtonPalletComponent],
  declarations: [FooterBarComponent, HeaderBarComponent, PageNotFoundComponent, ButtonPalletComponent],
  providers: []
})
export class HyderabadPageControlsModule {}
