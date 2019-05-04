import { Injectable } from '@angular/core';
import { BaseDataService, SessionService } from 'hyderabad';
import { TeamMemberDetail } from '../pmo-schema';

@Injectable({ providedIn: 'root' })
export class TeamMemberService extends BaseDataService<TeamMemberDetail> {
  constructor(public sessionService: SessionService) {
    super(sessionService);
  }
}
