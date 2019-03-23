import { Component, OnInit } from '@angular/core';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
  constructor(private personService: PersonService) {}

  ngOnInit() {
    this.personService.search().subscribe(data => {
      console.log(data);
    });
  }
}
