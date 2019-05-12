import { Component, Injector, OnInit } from '@angular/core';
import { BaseFormDetailComponent } from 'hyderabad';
import { TeamMemberDetailService } from 'src/app/business-services/team-member-detail.service';
import { TeamMemberDetail } from 'src/app/pmo-schema';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent extends BaseFormDetailComponent<TeamMemberDetail> implements OnInit {
  constructor(protected injector: Injector, protected teamMemberDetailService: TeamMemberDetailService) {
    super(injector, teamMemberDetailService);
  }

  setEntityInstance() {
    return new TeamMemberDetail();
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
