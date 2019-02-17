import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HyderabadModule } from 'hyderabad';
import { environment } from 'src/environments/environment.prod';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, HyderabadModule.forRoot(environment)],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
