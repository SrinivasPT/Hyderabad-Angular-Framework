import { Component, Injector, OnInit } from '@angular/core';
import { BaseFormListComponent } from 'projects/hyderabad/src/lib/hyderabad-base/base-form-list.component';
import { TeamMemberService } from 'src/app/business-services/team-member.service';
import { TeamMemberList } from 'src/app/pmo-schema';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent extends BaseFormListComponent<TeamMemberList> implements OnInit {
  constructor(protected injector: Injector, protected teamMemberService: TeamMemberService) {
    super(injector, teamMemberService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.tabValues = ['ACTIVE', 'INACTIVE', 'ALL'];
  }

  setEntityInstance() {
    return new TeamMemberList();
  }
}
