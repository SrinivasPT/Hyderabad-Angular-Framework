import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { httpInterceptorProviders, HyderabadModule, LoggerModule, NgxLoggerLevel, SessionService } from 'hyderabad';
import { environment } from 'src/environments/environment.prod';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HyderabadModule.forRoot(environment),
    LoggerModule.forRoot({
      serverLoggingUrl: 'https://localhost:5001/api/log',
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR
    })
  ],
  exports: [],
  providers: [
    SessionService,
    {
      provide: APP_INITIALIZER,
      useFactory: (sessionService: SessionService) => () => sessionService.login(),
      deps: [SessionService],
      multi: true
    },
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
