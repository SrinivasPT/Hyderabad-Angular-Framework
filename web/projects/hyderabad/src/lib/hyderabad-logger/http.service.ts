import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NGXLogInterface } from './types/ngx-log.interface';

@Injectable()
export class NGXLoggerHttpService {
  constructor(private readonly http: HttpClient) {}

  logOnServer(url: string, log: NGXLogInterface, options: object): Observable<any> {
    return this.http.post(url, log, options || {});
  }
}
