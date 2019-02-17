import { Injectable } from '@angular/core';
import { HandleError, HttpErrorHandler } from 'hyderabad';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({ providedIn: 'root' })
export class PersonService {
  personControllerUrl = 'https://localhost:5001/api/values'; // URL to web api
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('HeroesService');
  }

  /** GET heroes from the server */
  getHeroes(): Observable<any[]> {
    return this.http.get<any[]>(this.personControllerUrl).pipe(catchError(this.handleError('get', [])));
  }
}
