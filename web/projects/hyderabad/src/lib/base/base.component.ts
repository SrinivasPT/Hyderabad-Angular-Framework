import { Component } from '@angular/core';
import { SessionService } from '../services/session.service';
import { AppInjector } from './app-injector.service';

@Component({
  template: ''
})
export class BaseComponent {
  sessionService: SessionService;
  constructor() {
    // Manually retrieve the dependencies from the injector
    // so that constructor has no dependencies that must be passed in from child
    const injector = AppInjector.getInjector();
    // this.utilitiesService = injector.get(UtilitiesService);
    // this.loggingService = injector.get(LoggingService);
    this.sessionService = injector.get(SessionService);
    console.log(this.sessionService.getAuthorizationToken());
    this.logNavigation();
  }
  protected logError(errorMessage: string) {}
  private logNavigation() {}
}
