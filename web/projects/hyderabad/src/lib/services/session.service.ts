import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '../data-model';
import { BaseDataService } from './base-data.service';
import { CacheService } from './cache.service';
import { DatabaseService } from './database.service';

@Injectable()
export class SessionService extends BaseDataService<any> {
  auth: Auth = new Auth();
  constructor(
    protected http: HttpClient,
    protected cacheService: CacheService,
    protected databaseService: DatabaseService<hyderabad.Person>
  ) {
    super(http, cacheService, databaseService);
  }

  login() {
    return this.databaseService.post('security', 'login', { LanId: '43232' }).subscribe(data => {
      this.auth = data;
      // tslint:disable-next-line: no-string-literal
      this.auth['isAuthenticated'] ? this.startSession() : this.failedAuthentication();
    });
  }

  startSession() {}

  failedAuthentication() {
    console.log('Login failed!!!');
  }

  startWatching() {}

  getAuthorizationToken() {
    return `Bearer ${this.auth.bearerToken}`;
  }
}
