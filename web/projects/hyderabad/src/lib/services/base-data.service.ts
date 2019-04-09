import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CacheService } from './cache.service';

@Injectable({ providedIn: 'root' })
export abstract class BaseDataService<T> {
  controllerName: string;

  constructor(protected http: HttpClient, protected cacheService: CacheService) {
    this.controllerName = this.getControllerName();
    console.log(this.constructor.name);
  }

  get(id: string): Observable<T> {
    return this.cacheService.get(this.getCacheKey(id), this.http.get<T>(`${this.getURL('')}${id}`));
  }

  save(data: T): Observable<T> {
    return this.cacheService.get(
      this.getCacheKey(data['id']),
      this.http.post<T>(this.getURL('save'), data)
    );
  }

  search(criteria: any): Observable<[T]> {
    return this.cacheService.get(
      this.getCacheKey('Search', criteria),
      this.http.post<[T]>(this.getURL('search'), criteria)
    );
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

  getCacheKey = (id: string, action: string = '') =>
    `RecordID=${id}::${this.getControllerName()}::${action}`;
}
