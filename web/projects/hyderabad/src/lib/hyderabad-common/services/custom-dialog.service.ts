import { Injectable } from '@angular/core';
import { DialogService } from '@progress/kendo-angular-dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CustomDialogService {
  constructor(private dialogService: DialogService) {}

  showConfirmaton(message: string): Observable<boolean> {
    return (
      this.dialogService
        .open({
          title: 'Confirmation?',
          content: message,
          actions: [{ text: 'Yes', primary: true }, { text: 'No' }],
          width: 450,
          height: 200,
          minWidth: 250
        })
        // tslint:disable-next-line: no-string-literal
        .result.pipe(map(result => (result['primary'] ? false : true)))
    );
  }
}
