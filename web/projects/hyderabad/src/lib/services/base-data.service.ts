import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CacheService } from './cache.service';
import { DatabaseService } from './database.service';

@Injectable()
export abstract class BaseDataService<T> {
  // controllerName: string;
  // protected http: HttpClient;
  // protected cacheService: CacheService;
  // protected databaseService: DatabaseService<T>;

  constructor(protected http: HttpClient, protected cacheService: CacheService, protected databaseService: DatabaseService<T>) {
    // constructor() {
    // const injector = AppInjector.getInjector();
    // this.http = injector.get(HttpClient);
    // this.cacheService = injector.get(CacheService);
    // this.databaseService = injector.get<DatabaseService<T>>(DatabaseService);
    // this.controllerName = this.getControllerName();
    console.log(this.constructor.name);
  }

  get(id: string): Observable<T> {
    // return this.cacheService.get(this.getCacheKey(id), this.http.get<T>(`${this.getURL('')}${id}`));
    return this.cacheService.get(this.getCacheKey(id), this.databaseService.get(this.controllerName(), id));
  }

  save(data: T): Observable<T> {
    // tslint:disable-next-line: no-string-literal
    return this.cacheService.get(this.getCacheKey(data['id']), this.databaseService.save(this.controllerName(), data));
  }

  search(criteria: any): Observable<[T]> {
    return this.cacheService.get(this.getCacheKey('Search', criteria), this.databaseService.search(this.controllerName(), criteria));
  }

  delete(): boolean {
    return true;
  }

  // private getURL(action: string = ''): string {
  //   const baseURL = 'https://localhost:5001/api';
  //   return `${baseURL}/${this.controllerName}/${action}`;
  // }

  controllerName = (): string => this.constructor.name.replace('Service', '');

  getCacheKey = (id: string, action: string = '') => `RecordID=${id}::${this.controllerName()}::${action}`;
}
