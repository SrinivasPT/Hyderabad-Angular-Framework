import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DatabaseService<T> {
  baseURL = 'https://localhost:5001/api';
  constructor(private http: HttpClient) {}

  getAll = (controllerName: string): Observable<T> => this.http.get<T>(`${this.baseURL}/${controllerName}/`);

  get = (controllerName: string, id: string | number): Observable<T> => this.http.get<T>(`${this.baseURL}/${controllerName}/${id}`);

  getByParentID = (controllerName: string, id: string | number): Observable<T> =>
    this.http.get<T>(`${this.baseURL}/${controllerName}/GetByParentID/${id}`);

  save = (controllerName: string, payload: T) => this.http.post(`${this.baseURL}/${controllerName}/save`, payload);

  // tslint:disable-next-line: semicolon
  post = (controllerName: string, action: string, payload: any): Observable<any> =>
    this.http.post(`${this.baseURL}/${controllerName}/${action}`, payload);

  // tslint:disable-next-line: semicolon
  search = (controllerName: string, payload: T): Observable<T[]> =>
    this.http.post<T[]>(`${this.baseURL}/${controllerName}/search`, payload);

  // // tslint:disable-next-line: max-line-length
  // getValidationRules = (controllerName: string, id: string) =>
  //   this.http.get<T>(`${this.baseURL}/${controllerName}/getValidationRules/${id}`);
}
