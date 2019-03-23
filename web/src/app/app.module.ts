import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HyderabadModule } from 'hyderabad';
import { environment } from 'src/environments/environment.prod';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [HttpClientModule, BrowserAnimationsModule, AppRoutingModule, HyderabadModule.forRoot(environment)],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
