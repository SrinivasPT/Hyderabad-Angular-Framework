import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseFormDetailComponent, SessionService } from 'hyderabad';
import { TeamMemberExperienceService } from 'src/app/business-services';
import { TeamMemberExperience } from 'src/app/pmo-schema';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html'
})
export class ExperienceComponent extends BaseFormDetailComponent<TeamMemberExperience> implements OnInit {
  constructor(
    protected sessionService: SessionService,
    protected teamMemberExperienceService: TeamMemberExperienceService,
    protected activatedRoute: ActivatedRoute
  ) {
    super(sessionService, teamMemberExperienceService, activatedRoute);
  }

  ngOnInit() {}
}
