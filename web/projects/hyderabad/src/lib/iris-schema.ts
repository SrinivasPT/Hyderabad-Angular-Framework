import { GridDataResult } from '@progress/kendo-angular-grid';
import { clone } from 'ramda';

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
  public newEntityNodeName: string;
  public showEditForm: false;

  constructor(public data: any[] = [], newEntityName: string = '') {
    this.gridView = { data, total: data.length };
    this.gridData = clone(data);
    this.skip = 0;
    this.pageSize = 3;
    this.newEntityNodeName = newEntityName;
    this.showEditForm = false;
  }
}
