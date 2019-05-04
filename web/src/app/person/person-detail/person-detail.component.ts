import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormDetailComponent, SessionService } from 'hyderabad';
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

  constructor(
    protected sessionSerive: SessionService,
    protected personService: PersonService,
    protected activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    super(sessionSerive, personService, activatedRoute);
  }

  setEntityInstance(): TeamMember {
    return new TeamMember();
  }

  loadDataOne(id: string) {
    this.router.navigate(['../', id], { relativeTo: this.activatedRoute });
    // this.loadData(id);
  }

  // loadData(id: string) {
  //   this.personService.get(id).subscribe(data => {
  //     this.modal = data;
  //     this.form.patchValue(data);
  //     console.log(data);
  //   });
  // }
}
