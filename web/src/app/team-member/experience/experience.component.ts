import { Component, Injector, OnInit } from '@angular/core';
import { BaseFormDetailComponent, GridSetting } from 'hyderabad';
import { TeamMemberExperienceService } from 'src/app/business-services';
import { TeamMemberExperience, TeamMemberExperienceDetail } from 'src/app/pmo-schema';
import { ExperienceDetailComponent } from '../experience-detail/experience-detail.component';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html'
})
export class ExperienceComponent extends BaseFormDetailComponent<TeamMemberExperience | TeamMemberExperienceDetail> implements OnInit {
  gridSettings: GridSetting = new GridSetting();
  constructor(protected injector: Injector, protected teamMemberExperienceService: TeamMemberExperienceService) {
    super(injector, teamMemberExperienceService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  additionalFormInitialize() {
    this.gridSettings = new GridSetting(Object.values(this.entity['experience']), ExperienceDetailComponent);
  }
}
