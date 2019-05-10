import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';

export class BaseHomeComponent implements OnInit {
  tabValues = [];
  id = '';

  constructor(protected route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.pipe(tap(params => (this.id = params.get('id'))));
    console.log(this.id);
  }
}
