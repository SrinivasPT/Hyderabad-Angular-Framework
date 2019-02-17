import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export abstract class BaseService<T> {
  abstract get(): T;
  abstract save(payload: T): boolean;
  abstract search(criteria: any): [T];
  abstract delete(): boolean;
  constructor() {}
}
