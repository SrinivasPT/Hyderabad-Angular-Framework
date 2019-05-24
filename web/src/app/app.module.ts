import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HyderabadModule } from 'hyderabad';
import { httpInterceptorProviders, SessionService } from 'hyderabad-common';
import { LoggerModule, NgxLoggerLevel } from 'hyderabad-logger';
import { CanDeactivateGuard } from 'hyderabad-security';
// import { CanDeactivateGuard, httpInterceptorProviders, HyderabadModule, LoggerModule, NgxLoggerLevel, SessionService } from 'hyderabad';
import { environment } from 'src/environments/environment.prod';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    HyderabadModule.forRoot(environment),
    LoggerModule.forRoot({
      serverLoggingUrl: 'https://localhost:5001/api/log',
      level: NgxLoggerLevel.TRACE,
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
    httpInterceptorProviders,
    CanDeactivateGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
