import { Injectable, Injector } from '@angular/core';
import { BaseDataService } from 'hyderabad';
import { TeamMemberList, TeamMemberSearchCriteria } from '../pmo-schema';

@Injectable({ providedIn: 'root' })
export class TeamMemberService extends BaseDataService<TeamMemberList> {
  constructor(protected injector: Injector) {
    super(injector);
  }

  getSearchInstance(): TeamMemberSearchCriteria {
    return new TeamMemberSearchCriteria();
  }
}
