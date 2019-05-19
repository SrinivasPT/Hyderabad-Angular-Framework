import { Component, OnInit } from '@angular/core';

@Component({
  template: ''
})
export abstract class BaseComponent<T> implements OnInit {
  // form: FormGroup;

  ngOnInit() {}

  // protected setEntityInstance(data: any = {}): T {
  //   return {} as T;
  // }

}
