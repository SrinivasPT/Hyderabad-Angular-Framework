import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HyderabadModule } from 'hyderabad';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonRoutingModule } from './person-routing.module';
import { PersonService } from './person.service';

@NgModule({
  declarations: [PersonListComponent, PersonDetailComponent],
  imports: [CommonModule, PersonRoutingModule, HyderabadModule],
  providers: [PersonService]
})
export class PersonModule {}
