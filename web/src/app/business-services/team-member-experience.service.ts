import { Injectable } from '@angular/core';
import { BaseService } from 'projects/hyderabad/src/lib/base/base.service';
import { TeamMemberExperience } from '../pmo-schema';

@Injectable()
export class TeamMemberExperienceService extends BaseService<TeamMemberExperience> {
  constructor() {
    super();
  }
}
