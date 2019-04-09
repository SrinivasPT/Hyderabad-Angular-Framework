import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { SampleRoutingModule } from './sample-routing.module';
import { HyderabadModule } from 'hyderabad';

@NgModule({
  declarations: [PersonListComponent, PersonDetailComponent],
  imports: [CommonModule, SampleRoutingModule, HyderabadModule]
}) 
export class SampleModule {}
