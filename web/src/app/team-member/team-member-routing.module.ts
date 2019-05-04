import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from 'hyderabad';
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
      { path: 'detail', component: DetailComponent },
      { path: 'experience', component: ExperienceComponent },
      { path: 'allocation', component: AllocationComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamMemberRoutingModule {}
