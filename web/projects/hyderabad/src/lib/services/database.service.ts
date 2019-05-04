import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DatabaseService<T> {
  baseURL = 'https://localhost:5001/api';
  constructor(private http: HttpClient) {}

  getAll = (controllerName: string): Observable<T> => this.http.get<T>(`${this.baseURL}/${controllerName}/`);

  get = (controllerName: string, id: string): Observable<T> => this.http.get<T>(`${this.baseURL}/${controllerName}/${id}`);

  save = (controllerName: string, payload: T) => this.http.post(`${this.baseURL}/${controllerName}/save`, payload);

  post = (controllerName: string, action: string, payload: any): Observable<any> =>
    // tslint:disable-next-line: semicolon
    this.http.post(`${this.baseURL}/${controllerName}/${action}`, payload);

  search = (controllerName: string, payload: T): Observable<T[]> =>
    // tslint:disable-next-line: semicolon
    this.http.post<T[]>(`${this.baseURL}/${controllerName}/search`, payload);
}
