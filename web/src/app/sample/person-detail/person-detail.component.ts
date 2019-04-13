import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CacheService, NGXLogger } from 'hyderabad';
import { Person } from '../../data-model';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {
  form: FormGroup;
  modal = {};
  id = '80';

  showDebugInfo = false;

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    private cahceService: CacheService,
    private logger: NGXLogger
  ) {
    this.logger.debug('Your log message goes here');
    this.logger.error('Your log message goes here');
    this.logger.debug('Multiple', 'Argument', 'support');
  }

  ngOnInit() {
    this.form = this.fb.group({ ...new Person() });
    this.loadData(this.id);
  }

  loadData(id: string) {
    this.personService.get(id).subscribe(data => {
      this.modal = data;
      this.form.patchValue(data);
      console.log(data);
    });
  }

  clearCache() {
    this.cahceService.clear();
  }
}
