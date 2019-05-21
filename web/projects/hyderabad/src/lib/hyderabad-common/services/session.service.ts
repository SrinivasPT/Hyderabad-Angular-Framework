import { Injectable } from '@angular/core';
import { NGXLogger } from 'hyderabad-logger';
import { UserIdleService } from '../../hyderabad-security/services/idle.service';
import { Auth } from '../../iris-schema';
import { DatabaseService } from './database.service';

@Injectable()
export class SessionService {
  isLoggedIn = false;
  auth: Auth = new Auth();
  constructor(public idleService: UserIdleService, public databaseService: DatabaseService<any>, protected logger: NGXLogger) {}

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
    this.logger.info('User Logged in successfully & starting a new session');
    this.idleService.startWatching();
  }

  failedAuthentication() {
    this.logger.info('User Failed authentication');
  }

  startWatching() {}

  getAuthorizationToken() {
    return `Bearer ${this.auth.bearerToken}`;
  }
}
