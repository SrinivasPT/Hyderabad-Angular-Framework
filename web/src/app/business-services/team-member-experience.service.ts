import { Injectable, Injector } from '@angular/core';
import { BaseDataService } from 'hyderabad';
import { has, identity } from 'ramda';
import { TeamMemberExperience, TeamMemberExperienceDetail } from '../pmo-schema';

@Injectable({ providedIn: 'root' })
export class TeamMemberExperienceService extends BaseDataService<TeamMemberExperience | TeamMemberExperienceDetail> {
  constructor(protected injector: Injector) {
    super(injector);
  }

  parse(data: TeamMemberExperience | TeamMemberExperienceDetail): TeamMemberExperience | TeamMemberExperienceDetail {
    // tslint:disable-next-line: no-string-literal
    has('fromDate', data) ? (data['fromDate'] = new Date(data['fromDate'])) : identity(0);
    // tslint:disable-next-line: no-string-literal
    has('toDate', data) ? (data['toDate'] = new Date(data['toDate'])) : identity(0);
    // tslint:disable-next-line: no-string-literal
    has('startDate', data) ? (data['startDate'] = new Date(data['startDate'])) : identity(0);
    // tslint:disable-next-line: no-string-literal
    has('endDate', data) ? (data['endDate'] = new Date(data['endDate'])) : identity(0);

    //   data.toDate = new Date(data.toDate);
    //   data.startDate = formatDate(data.startDate);
    //   data.endDate = formatDate(data.endDate);
    //   return data;
    // }
    return data;
  }
}
