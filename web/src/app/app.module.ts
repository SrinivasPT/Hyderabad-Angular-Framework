import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HyderabadModule } from 'hyderabad';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HyderabadModule],
  exports: [HyderabadModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
