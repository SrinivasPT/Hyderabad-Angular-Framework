import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'hyderabad';
import { UserIdleService } from 'hyderabad-security';
import { CustomDialogService } from 'projects/hyderabad/src/lib/hyderabad-common/services/custom-dialog.service';
import { identity } from 'ramda';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Hyderabad Angular Framework';
  constructor(
    private idleService: UserIdleService,
    private sessionService: SessionService,
    private router: Router,
    private customDialoService: CustomDialogService
  ) {}

  ngOnInit() {
    this.idleService.onTimerStart().subscribe(timeout => {
      console.log('Session Timedout!!! Trying to navigate to the logout page!' + timeout);
      if (timeout === 1) {
        this.customDialoService.showConfirmaton('Session about to expire. Do you want to continue current session?').subscribe(result => {
          result ? this.idleService.resetTimer() : identity(0);
        });
      }

      this.idleService.onTimeout().subscribe(() => {
        this.sessionService.endSession();
        this.router.navigate(['/logout']);
      });
    });
  }
}
