import { Injectable } from '@angular/core';
import { UserIdleService } from '../../hyderabad-security/services/idle.service';
import { Auth } from '../../iris-schema';
import { DatabaseService } from './database.service';

@Injectable()
export class SessionService {
  isLoggedIn = false;
  auth: Auth = new Auth();
  constructor(public idleService: UserIdleService, public databaseService: DatabaseService<any>) {}

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
