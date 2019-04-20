import { Injectable } from '@angular/core';
import { BaseDataService, SessionService } from 'hyderabad';
import { Person } from '../data-model';

@Injectable()
export class PersonService extends BaseDataService<Person> {
  constructor(public sessionService: SessionService) {
    super(sessionService);
  }
}
