import { TemplateRef } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { clone } from 'ramda';
import { GridEditAction } from './iris-enum';

export class IEntity {
  id: number;
}

export class User {
  id: number = undefined;
  name: string = undefined;
}

export class Auth {
  constructor(
    public landId: string = null,
    public userName: string = null,
    public firstName: string = null,
    public lastName: string = null,
    public bearerToken: string = '',
    public isAuthenticated = false
  ) {}
}

export class GridSetting {
  public gridView: GridDataResult;
  public gridData: any[];
  public skip: number;
  public pageSize: number;
  public showEditForm: false;
  public content: string | TemplateRef<any> | Function;
  public editAction: number;

  constructor(
    data: any[] = [],
    detailDialogComponent: string | TemplateRef<any> | Function = '',
    editAction: number = GridEditAction.REDIRECT_AT_CHILD_LEVEL
  ) {
    this.skip = 0;
    this.pageSize = 3;
    this.gridData = clone(data);
    this.gridView = { data: data.slice(this.skip, this.skip + this.pageSize), total: data.length };
    this.showEditForm = false;
    this.content = detailDialogComponent;
    this.editAction = editAction;
  }

  reset() {
    this.skip = 0;
  }
}

export class FieldValidationRule {
  constructor(
    public fieldName: string = null,
    public min: number = null,
    public max: number = null,
    public email: string = null,
    public minLength: number = null,
    public maxLength: number = null,
    public pattern: string = null,
    public required: number = null,
    public errorMessage: string = null
  ) {}
}

export class FormFieldValidationErrorMessage {
  constructor(public sectionName: string = null, public fieldName: string = null, public ErrorMessage: string = null) {}
}

export enum PageType {
  LIST = 1,
  DETAIL,
  DETAIL_POPUP
}

export class PageContext {
  componentName: string = null; // Current Component Name
  pageType: number = null; // Page type - Listing / Detail / Detail Opened in dialog
  id: number | string = null; // id of the record
  searchCriteria: any = null; // Search criteria in case the page is of type list page
  formData: any; // form data
  originalFormData: any; // data retrieved from the database
  url: string = null; // current URL of the current page
  userAction: any[] = []; // List of all the user actions on the current page
}
