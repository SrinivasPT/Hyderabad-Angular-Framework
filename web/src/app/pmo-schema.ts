import { IEntity } from 'hyderabad';

export class TeamMemberSearchCriteria {
  constructor(
    public id: string = null,
    public TeamMemberId: string = null,
    public firstName: string = null,
    public lastName: string = null,
    public country: string = null,
    public selectedTab: string = 'ACTIVE'
  ) {}
}

export class TeamMemberList extends IEntity {
  constructor(
    public id: number = null,
    public TeamMemberId: string = null,
    public firstName: string = null,
    public lastName: string = null,
    public country: string = null
  ) {
    super();
  }
}

export class TeamMemberDetail extends IEntity {
  constructor(
    public id: number = null,
    public teamMemberId: string = null,
    public firstName: string = null,
    public lastName: string = null,
    public country: string = null,
    public joinDate: Date = null,
    public comments: Date = null
  ) {
    super();
    this.joinDate = new Date(joinDate);
  }
}

export class TeamMemberExperience extends IEntity {
  constructor(
    public id: number = null,
    public teamMemberId: string = null,
    public organization: string = null,
    public startDate: string = null,
    public endDate: string = null
  ) {
    super();
  }
}

export class TeamMemberExperienceDetail extends IEntity {
  constructor(
    public id: number = null,
    public teamMemberId: string = null,
    public organization: string = null,
    public fromDate: Date = null,
    public toDate: Date = null
  ) {
    super();
  }
  parse() {
    this.fromDate = new Date(this.fromDate);
    this.toDate = new Date(this.toDate);
  }
}

export class TeamMemberProjectAllocations extends IEntity {
  constructor(
    public id: number = null,
    public TeamMemberId: string = null,
    public projectId: string = null,
    public startDate: Date = null,
    public endDate: Date = null
  ) {
    super();
  }
}

export class TeamMember extends IEntity {
  constructor(
    public id: number = null,
    public detail: TeamMemberDetail = new TeamMemberDetail(),
    public experience: TeamMemberExperience = new TeamMemberExperience(),
    public allocations: TeamMemberProjectAllocations = new TeamMemberProjectAllocations()
  ) {
    super();
  }
}
