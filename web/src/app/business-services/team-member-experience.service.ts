import { Injectable } from '@angular/core';
import { BaseDataService, SessionService } from 'hyderabad';
import { TeamMemberExperience } from '../pmo-schema';

@Injectable({ providedIn: 'root' })
export class TeamMemberExperienceService extends BaseDataService<TeamMemberExperience> {
  constructor(public sessionService: SessionService) {
    super(sessionService);
  }
}
