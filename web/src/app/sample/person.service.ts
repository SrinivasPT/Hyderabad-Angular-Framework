import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseDataService, CacheService, DatabaseService } from 'hyderabad';

@Injectable()
export class PersonService extends BaseDataService<hyderabad.Person> {
  constructor(
    protected http: HttpClient,
    protected cacheService: CacheService,
    protected databaseService: DatabaseService<hyderabad.Person>
  ) {
    super(http, cacheService, databaseService);
  }
}
