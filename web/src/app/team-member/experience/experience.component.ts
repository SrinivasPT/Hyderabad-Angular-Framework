import { Component, Injector, OnInit } from '@angular/core';
import { BaseFormDetailComponent, GridSetting } from 'hyderabad';
import { GridEditAction } from 'projects/hyderabad/src/lib/iris-enum';
import { TeamMemberExperienceService } from 'src/app/business-services';
import { TeamMemberExperience, TeamMemberExperienceDetail } from 'src/app/pmo-schema';
import { ExperienceDetailComponent } from '../experience-detail/experience-detail.component';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html'
})
export class ExperienceComponent extends BaseFormDetailComponent<TeamMemberExperience | TeamMemberExperienceDetail> implements OnInit {
  gridSettings: GridSetting = new GridSetting();
  gridSettings_1: GridSetting = new GridSetting();
  constructor(protected injector: Injector, protected teamMemberExperienceService: TeamMemberExperienceService) {
    super(injector, teamMemberExperienceService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  additionalFormInitialize() {
    const testData = [
      { id: 12345, firstName: 'Srinivas', lastName: 'Peeta', age: 44, city: 'Hyderabad' },
      { id: 23456, firstName: 'Sreelatha', lastName: 'Peeta', age: 44, city: 'Pune' },
      { id: 12346, firstName: 'Srinivas_1', lastName: 'Peeta', age: 44, city: 'Hyderabad' },
      { id: 23457, firstName: 'Sreelatha_1', lastName: 'Peeta', age: 44, city: 'Pune' }
    ];
    this.gridSettings = new GridSetting(Object.values(this.entity['experience']), ExperienceDetailComponent, GridEditAction.OPEN_POPUP);
    this.gridSettings_1 = new GridSetting(testData, ExperienceDetailComponent, GridEditAction.OPEN_POPUP);
  }
}
