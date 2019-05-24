import { Injectable } from '@angular/core';
import { DialogService } from '@progress/kendo-angular-dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export enum DialogType {
  CONFIRMATION = 1,
  FORM_DEACTIVATE
}

@Injectable({ providedIn: 'root' })
export class CustomDialogService {
  constructor(private dialogService: DialogService) {}

  showConfirmaton(message: string): Observable<boolean> {
    return this.showDialog(DialogType.CONFIRMATION, message);
  }

  showFormDeactivateConfirmation(): Observable<boolean> {
    return this.showDialog(DialogType.FORM_DEACTIVATE, 'Form has changes. Do you want to save changes?');
  }

  private showDialog(dialogType: DialogType, message: string): Observable<boolean> {
    const title = this.getTitle(dialogType);
    return (
      this.dialogService
        .open({
          title,
          content: message,
          actions: [{ text: 'Yes', primary: true }, { text: 'No' }],
          width: 450,
          height: 200,
          minWidth: 250
        })
        // tslint:disable-next-line: no-string-literal
        .result.pipe(map(result => (result['primary'] ? true : false)))
    );
  }

  getTitle(dialogType: DialogType) {
    switch (dialogType) {
      case DialogType.CONFIRMATION:
        return 'Confirmation!';
        break;
      case DialogType.FORM_DEACTIVATE:
        return 'Save Changes?!';
        break;
      default:
        break;
    }
  }
}
