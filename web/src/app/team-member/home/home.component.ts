import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormHomeComponent } from 'hyderabad';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent extends BaseFormHomeComponent implements OnInit {
  constructor(protected route: ActivatedRoute, protected router: Router) {
    super(route, router);
    this.tabValues = ['detail', 'experience', 'allocations'];
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
