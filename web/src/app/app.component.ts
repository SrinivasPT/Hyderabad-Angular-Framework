import { Component } from '@angular/core';
import { prop } from 'ramda';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'iris';
  constructor() {
    console.log(prop('x', { x: 100 }));
  }
}
