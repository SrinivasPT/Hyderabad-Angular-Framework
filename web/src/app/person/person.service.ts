import { Injectable, Injector } from '@angular/core';
import { BaseDataService } from 'hyderabad';
import { TeamMember } from '../pmo-schema';

@Injectable()
export class PersonService extends BaseDataService<TeamMember> {
  constructor(protected injector: Injector) {
    super(injector);
  }

  getSearchInstance() {}
}
