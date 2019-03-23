import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({ providedIn: 'root' })
export abstract class BaseService<T> {
  controllerName: string;

  constructor(protected http: HttpClient) {
    this.controllerName = this.getControllerName();
    console.log(this.constructor.name);
  }

  get(): Observable<T> {
    return this.http.get<T>(this.getURL());
  }

  save(): boolean {
    return true;
  }

  search(): Observable<[T]> {
    return this.http.get<[T]>(this.getURL());
  }

  delete(): boolean {
    return true;
  }

  private getURL(action: string = ''): string {
    const baseURL = 'https://localhost:5001/api';
    return `${baseURL}/${this.controllerName}/${action}`;
  }

  getControllerName(): string {
    return this.constructor.name.replace('Service', '');
  }

}
