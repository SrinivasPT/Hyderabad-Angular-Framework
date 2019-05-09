import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';

export class BaseHomeComponent implements OnInit {
  selectedTab = '';

  constructor(protected route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.pipe(tap(params => (this.selectedTab = params.get('id'))));
    console.log(this.selectedTab);
  }
}
