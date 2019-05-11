import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';

export class BaseFormHomeComponent implements OnInit {
  tabValues = [];
  selectedTabIndex: number;
  id = '';

  constructor(protected route: ActivatedRoute, protected router: Router) {}

  ngOnInit() {
    const routeSegment = this.router.url.split('/').reverse()[0];
    this.selectedTabIndex = this.tabValues.indexOf(routeSegment);
    this.route.paramMap.pipe(tap(params => (this.id = params.get('id'))));
    console.log(this.id);
  }

  onTabSelect(event) {
    console.log(`Selected Tab ${JSON.stringify(event)}`);
    this.router.navigate([`./${this.tabValues[event.index]}`], { relativeTo: this.route });
    // this.router.navigate(['./experience'], { relativeTo: this.route });
  }
}
