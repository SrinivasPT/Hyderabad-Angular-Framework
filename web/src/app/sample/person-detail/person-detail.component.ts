import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {
  form: FormGroup;
  modal = { firstName: 'Srinivas', lastName: 'Peeta', country:'India', joinDate: new Date('1/1/2019') };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({ ...this.modal });
  }

}
