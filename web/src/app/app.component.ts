import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'hyderabad';
import { UserIdleService } from 'hyderabad-security';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Hyderabad Angular Framework';
  constructor(private idleService: UserIdleService, private sessionService: SessionService, private router: Router) {}

  ngOnInit() {
    this.idleService.onTimerStart().subscribe(timeout => {
      console.log('Session Timedout!!! Trying to navigate to the logout page!' + timeout);
    });

    this.idleService.onTimeout().subscribe(() => {
      this.sessionService.endSession();
      this.router.navigate(['/logout']);
    });
  }
}
