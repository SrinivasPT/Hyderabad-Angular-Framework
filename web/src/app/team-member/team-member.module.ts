import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GridModule } from '@progress/kendo-angular-grid';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { AllocationComponent } from './allocation/allocation.component';
import { DetailComponent } from './detail/detail.component';
import { ExperienceComponent } from './experience/experience.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { TeamMemberRoutingModule } from './team-member-routing.module';

@NgModule({
  declarations: [HomeComponent, ExperienceComponent, DetailComponent, AllocationComponent, ListComponent],
  imports: [CommonModule, TeamMemberRoutingModule, LayoutModule, GridModule]
})
export class TeamMemberModule {}
