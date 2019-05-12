import { Injectable, Injector } from '@angular/core';
import { BaseDataService } from 'hyderabad';
import { TeamMemberExperience } from '../pmo-schema';

@Injectable({ providedIn: 'root' })
export class TeamMemberExperienceService extends BaseDataService<TeamMemberExperience> {
  constructor(protected injector: Injector) {
    super(injector);
  }
}
