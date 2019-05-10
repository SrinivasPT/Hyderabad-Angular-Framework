import { Injectable } from '@angular/core';
import { BaseDataService, SessionService } from 'hyderabad';
import { TeamMemberDetail } from '../pmo-schema';

@Injectable({ providedIn: 'root' })
export class TeamMemberDetailService extends BaseDataService<TeamMemberDetail> {
  constructor(public sessionService: SessionService) {
    super(sessionService);
  }

  parse(data: TeamMemberDetail): TeamMemberDetail {
    data.joinDate = new Date(data.joinDate);
    return data;
  }
}
