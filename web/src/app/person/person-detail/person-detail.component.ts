import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { BaseFormDetailComponent } from 'hyderabad';
import { TeamMember } from '../../pmo-schema';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent extends BaseFormDetailComponent<TeamMember> {
  // form: FormGroup;
  modal = {};
  // id = '80';

  showDebugInfo = false;

  constructor(protected injector: Injector, protected personService: PersonService, private router: Router) {
    super(injector, personService);
  }

  setEntityInstance(): TeamMember {
    return new TeamMember();
  }

  loadDataOne(id: string) {
    this.router.navigate(['../', id], { relativeTo: this.activatedRoute });
  }
}
