import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CanDeactivateGuard, httpInterceptorProviders, HyderabadModule, LoggerModule, NgxLoggerLevel, SessionService } from 'hyderabad';
import { environment } from 'src/environments/environment.prod';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login';

export let AppInjector: Injector;

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
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
    httpInterceptorProviders,
    CanDeactivateGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    AppInjector = this.injector;
  }
}
