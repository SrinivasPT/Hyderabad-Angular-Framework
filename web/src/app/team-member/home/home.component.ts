import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseHomeComponent } from 'hyderabad';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent extends BaseHomeComponent implements OnInit {
  constructor(protected route: ActivatedRoute) {
    super(route);
  }

  ngOnInit() {}

  onTabSelect(event) {
    console.log(`Selected Tab ${JSON.stringify(event)}`);
  }
}
