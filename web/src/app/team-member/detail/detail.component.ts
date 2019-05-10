import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseFormDetailComponent, SessionService } from 'hyderabad';
import { TeamMemberDetailService } from 'src/app/business-services/team-member-detail.service';
import { TeamMemberDetail } from 'src/app/pmo-schema';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent extends BaseFormDetailComponent<TeamMemberDetail> implements OnInit {
  constructor(
    protected sessionService: SessionService,
    protected teamMemberDetailService: TeamMemberDetailService,
    protected activatedRoute: ActivatedRoute
  ) {
    super(sessionService, teamMemberDetailService, activatedRoute);
  }

  setEntityInstance() {
    return new TeamMemberDetail();
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
