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

  // Note: Observe the return type. It can either return single value or a collection based on the type of call.
  get(id: string | number): Observable<T | T[]> {
    return this.cacheService.get(this.getCacheKey(id), this.databaseService.get(this.controllerName(), id));
  }

  save(data: T): Observable<T> {
    // tslint:disable-next-line: no-string-literal
    return this.cacheService.get(this.getCacheKey(data['id']), this.databaseService.save(this.controllerName(), data));
  }

  search(criteria: any): Observable<any> {
    return this.cacheService.get(
      this.getCacheKey('Search', JSON.stringify(criteria)),
      this.databaseService.search(this.controllerName(), criteria)
    );
  }

  delete(): boolean {
    return true;
  }

  // getValidationRules(formName: string) {
  //   return this.cacheService.get(
  //     this.getCacheKey(formName, 'ValidationRules'),
  //     this.databaseService.getValidationRules(this.controllerName(), formName)
  //   );
  // }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
    // const id = route.paramMap.get('id');
    const id = state.url.split('/').reverse()[1];

    if (id) {
      return this.get(id).pipe(
        take(1),
        mergeMap(data => {
          return data ? of(data) : EMPTY;
        })
      );
    } else {
      return this.search(this.getSearchInstance()).pipe(
        take(1),
        mergeMap(data => {
          return data ? of(data) : EMPTY;
        })
      );
    }
  }

  getSearchInstance() {}

  controllerName = (): string => this.constructor.name.replace('Service', '');

  getCacheKey = (id: string | number = '', action: string = '') => `RecordID=${id}::${this.controllerName()}::${action}`;

  parse(entity: T): T {
    return entity;
  }
}
