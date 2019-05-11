import { Injectable } from '@angular/core';
import { BaseDataService, SessionService } from 'hyderabad';
import { TeamMemberList, TeamMemberSearchCriteria } from '../pmo-schema';

@Injectable({ providedIn: 'root' })
export class TeamMemberService extends BaseDataService<TeamMemberList> {
  constructor(public sessionService: SessionService) {
    super(sessionService);
  }

  getSearchInstance(): TeamMemberSearchCriteria {
    return new TeamMemberSearchCriteria();
  }
}
