import { Injectable } from '@angular/core';
import { BaseService } from 'projects/hyderabad/src/lib/base/base.service';
import { TeamMemberProjectAllocations } from '../pmo-schema';

@Injectable()
export class TeamMemberAllocationService extends BaseService<TeamMemberProjectAllocations> {
  constructor() {
    super();
  }
}
