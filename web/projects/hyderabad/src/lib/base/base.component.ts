import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  template: ''
})
export abstract class BaseComponent<T> implements OnInit {
  form: FormGroup;

  ngOnInit() {}

  protected setEntityInstance(data: any = {}): T {
    return {} as T;
  }

  protected logError(errorMessage: string) {}

  protected logNavigation() {}
}
