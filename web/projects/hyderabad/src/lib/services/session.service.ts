import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '../data-model';
import { BaseDataService } from './base-data.service';
import { CacheService } from './cache.service';
import { DatabaseService } from './database.service';
import { UserIdleService } from './idle.service';

@Injectable()
export class SessionService extends BaseDataService<any> {
  auth: Auth = new Auth();
  constructor(
    protected http: HttpClient,
    protected cacheService: CacheService,
    protected idleService: UserIdleService,
    protected databaseService: DatabaseService<hyderabad.Person>
  ) {
    super(http, cacheService, databaseService);
  }

  /**
   * Notes: This function is returning the promise. APP_INITIALIZER in AppModule will wait till this function is resolved
   * To achieve this promises are used.
   */
  login(): Promise<any> {
    let retVal = new Promise((resolve, reject) => {
      this.databaseService.post('security', 'login', { LanId: '43232' }).subscribe(data => {
        this.auth = data;
        // tslint:disable-next-line: no-string-literal
        if (this.auth['isAuthenticated']) {
          this.startSession();
        } else {
          this.failedAuthentication();
        }
        resolve(true);
      });
    });
    return retVal;
  }

  startSession() {
    this.idleService.startWatching();
  }

  failedAuthentication() {
    console.log('Login failed!!!');
  }

  startWatching() {}

  getAuthorizationToken() {
    return `Bearer ${this.auth.bearerToken}`;
  }
}
