import { Injectable } from '@angular/core';
import { BaseDataService, SessionService } from 'hyderabad';
import { TeamMember } from '../pmo-schema';

@Injectable()
export class PersonService extends BaseDataService<TeamMember> {
  constructor(public sessionService: SessionService) {
    super(sessionService);
  }

  getSearchInstance() {}
}
