import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hyd-log-out',
  template: `
    <h2>Session Timed Out. Please login again!</h2>
  `
})
export class LogoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
