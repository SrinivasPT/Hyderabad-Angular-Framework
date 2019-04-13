import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseDataService } from 'projects/hyderabad/src/lib/services/base-data.service';
import { CacheService } from 'projects/hyderabad/src/lib/services/cache.service';

@Injectable({ providedIn: 'root' })
export class PersonService extends BaseDataService<hyderabad.Person> {
  constructor(protected http: HttpClient, protected cacheService: CacheService) {
    super(http, cacheService);
  }
}
