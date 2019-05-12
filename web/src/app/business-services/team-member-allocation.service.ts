import { Injectable, Injector } from '@angular/core';
import { BaseDataService } from 'hyderabad';
import { TeamMemberProjectAllocations } from '../pmo-schema';

@Injectable({ providedIn: 'root' })
export class TeamMemberAllocationService extends BaseDataService<TeamMemberProjectAllocations> {
  constructor(protected injector: Injector) {
    super(injector);
  }
}
