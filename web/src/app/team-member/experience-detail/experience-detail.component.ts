import { Component, Injector, Input, OnInit } from '@angular/core';
import { BaseFormDetailDialogComponent } from 'projects/hyderabad/src/lib/hyderabad-base/base-form-detail-dialog.component';
import { TeamMemberExperienceService } from 'src/app/business-services';
import { TeamMemberExperience, TeamMemberExperienceDetail } from 'src/app/pmo-schema';

@Component({
  selector: 'app-experience-detail',
  templateUrl: './experience-detail.component.html'
})
export class ExperienceDetailComponent extends BaseFormDetailDialogComponent<TeamMemberExperience | TeamMemberExperienceDetail>
  implements OnInit {
  @Input() public formData: TeamMemberExperienceDetail;

  constructor(protected injector: Injector, protected teamMemberExperienceService: TeamMemberExperienceService) {
    super(injector, teamMemberExperienceService);
  }

  setEntityInstance() {
    return new TeamMemberExperienceDetail();
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
