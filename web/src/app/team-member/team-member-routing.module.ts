import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from 'hyderabad';
import { TeamMemberAllocationService } from '../business-services/team-member-allocation.service';
import { TeamMemberDetailService } from '../business-services/team-member-detail.service';
import { TeamMemberExperienceService } from '../business-services/team-member-experience.service';
import { TeamMemberService } from '../business-services/team-member.service';
import { AllocationComponent } from './allocation/allocation.component';
import { DetailComponent } from './detail/detail.component';
import { ExperienceComponent } from './experience/experience.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    canDeactivate: [CanDeactivateGuard],
    resolve: { data: TeamMemberService }
  },
  {
    path: ':id',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'detail', pathMatch: 'full' },
      { path: 'detail', component: DetailComponent, resolve: { data: TeamMemberDetailService } },
      { path: 'experience', component: ExperienceComponent, resolve: { data: TeamMemberExperienceService } },
      { path: 'allocation', component: AllocationComponent, resolve: { data: TeamMemberAllocationService } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamMemberRoutingModule {}
