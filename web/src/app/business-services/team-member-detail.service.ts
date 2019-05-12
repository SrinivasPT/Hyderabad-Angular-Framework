import { Injectable, Injector } from '@angular/core';
import { BaseDataService } from 'hyderabad';
import { TeamMemberDetail } from '../pmo-schema';

@Injectable({ providedIn: 'root' })
export class TeamMemberDetailService extends BaseDataService<TeamMemberDetail> {
  constructor(protected injector: Injector) {
    super(injector);
  }

  parse(data: TeamMemberDetail): TeamMemberDetail {
    data.joinDate = new Date(data.joinDate);
    return data;
  }
}
