import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormComponent, SessionService } from 'hyderabad';
import { Person } from '../../data-model';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent extends BaseFormComponent<Person> {
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

  setEntityInstance(): Person {
    return new Person();
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
