import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseHomeComponent } from 'hyderabad';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent extends BaseHomeComponent implements OnInit {
  constructor(protected route: ActivatedRoute, protected router: Router) {
    super(route);
  }

  ngOnInit() {
    this.tabValues = ['detail', 'experience', 'allocations'];
  }

  onTabSelect(event) {
    console.log(`Selected Tab ${JSON.stringify(event)}`);
    // this.router.navigate([`./${this.tabValues[event.index]}`], { relativeTo: this.route });
    this.router.navigate([`./experience`], { relativeTo: this.route });
  }
}
