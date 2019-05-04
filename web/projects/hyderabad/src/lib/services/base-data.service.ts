import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { EMPTY, of } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { mergeMap, take } from 'rxjs/operators';
import { SessionService } from './session.service';

@Injectable()
export abstract class BaseDataService<T> implements Resolve<T> {
  constructor(protected sessionService: SessionService) {}

  cacheService = this.sessionService.cacheService;
  databaseService = this.sessionService.databaseService;

  getAll(): Observable<T> {
    return this.cacheService.get(this.getCacheKey(), this.databaseService.getAll(this.controllerName()));
  }

  get(id: string): Observable<T> {
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

  controllerName = (): string => this.constructor.name.replace('Service', '');

  getCacheKey = (id: string = '', action: string = '') => `RecordID=${id}::${this.controllerName()}::${action}`;

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T> | Observable<never> {
    const id = route.paramMap.get('id');

    if (id) {
      return this.get(id).pipe(
        take(1),
        mergeMap(data => {
          return data ? of(data) : EMPTY;
        })
      );
    } else {
      return this.getAll().pipe(
        take(1),
        mergeMap(data => {
          return data ? of(data) : EMPTY;
        })
      );
    }
  }
}
