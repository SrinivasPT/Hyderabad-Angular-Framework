import { Component } from '@angular/core';
import { BaseDataService } from '../services/base-data.service';
import { SessionService } from '../services/session.service';

@Component({
  template: ''
})
export class BaseComponent<T> {
  constructor(protected sessionService: SessionService, protected baseService: BaseDataService<T>) {
    this.logNavigation();
  }

  protected logError(errorMessage: string) {}

  private logNavigation() {}
}
