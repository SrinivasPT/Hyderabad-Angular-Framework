import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Auth } from '../data-model';
import { NGXLogger } from '../logger/logger.service';
import { CacheService } from './cache.service';
import { DatabaseService } from './database.service';
import { UserIdleService } from './idle.service';

@Injectable()
export class SessionService {
  auth: Auth = new Auth();
  constructor(
    public cacheService: CacheService,
    public idleService: UserIdleService,
    public logger: NGXLogger,
    public databaseService: DatabaseService<any>,
    public fb: FormBuilder
  ) {
    // super(cacheService, databaseService);
  }

  /**
   * Notes: This function is returning the promise. APP_INITIALIZER in AppModule will wait till this function is resolved
   * To achieve this promises are used.
   */
  login(): Promise<any> {
    const retVal = new Promise((resolve, reject) => {
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
