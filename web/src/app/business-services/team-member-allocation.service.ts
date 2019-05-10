import { Injectable } from '@angular/core';
import { BaseDataService, SessionService } from 'hyderabad';
import { TeamMemberProjectAllocations } from '../pmo-schema';

@Injectable({ providedIn: 'root' })
export class TeamMemberAllocationService extends BaseDataService<TeamMemberProjectAllocations> {
  constructor(public sessionService: SessionService) {
    super(sessionService);
  }
}
