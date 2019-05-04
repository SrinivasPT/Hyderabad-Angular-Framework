import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from 'hyderabad';
import { BaseFormListComponent } from 'projects/hyderabad/src/lib/base/base-form-list.component';
import { TeamMemberService } from 'src/app/business-services/team-member.service';
import { TeamMemberList } from 'src/app/pmo-schema';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent extends BaseFormListComponent<TeamMemberList> implements OnInit {
  constructor(
    protected sessionService: SessionService,
    protected teamMemberService: TeamMemberService,
    protected activatedRoute: ActivatedRoute
  ) {
    super(sessionService, teamMemberService, activatedRoute);
  }

  setEntityInstance = () => [new TeamMemberList()];

  ngOnInit() {
    super.ngOnInit();
  }
}
