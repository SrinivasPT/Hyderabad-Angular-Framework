import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HyderabadModule } from 'hyderabad';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonService } from './person.service';
import { SampleRoutingModule } from './sample-routing.module';

@NgModule({
  declarations: [PersonListComponent, PersonDetailComponent],
  imports: [CommonModule, SampleRoutingModule, HyderabadModule],
  providers: [PersonService]
})
export class SampleModule {}
