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

export class TeamMemberList {
  constructor(
    public id: string = null,
    public TeamMemberId: string = null,
    public firstName: string = null,
    public lastName: string = null,
    public country: string = null
  ) {}
}

export class TeamMemberDetail {
  constructor(
    public id: string = null,
    public TeamMemberId: string = null,
    public firstName: string = null,
    public lastName: string = null,
    public country: string = null
  ) {}
}

export class TeamMemberExperience {
  constructor(
    public id: string = null,
    public teamMemberId: string = null,
    public organization: string = null,
    public startDate: Date = null,
    public endDate: Date = null
  ) {}
}

export class TeamMemberProjectAllocations {
  constructor(
    public id: string = null,
    public TeamMemberId: string = null,
    public projectId: string = null,
    public startDate: Date = null,
    public endDate: Date = null
  ) {}
}

export class TeamMember {
  constructor(
    public id: string = null,
    public detail: TeamMemberDetail = new TeamMemberDetail(),
    public experience: TeamMemberExperience = new TeamMemberExperience(),
    public allocations: TeamMemberProjectAllocations = new TeamMemberProjectAllocations()
  ) {}
}
