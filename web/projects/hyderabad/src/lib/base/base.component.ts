import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PageChangeEvent } from '@progress/kendo-angular-grid';
import { clone } from 'ramda';
import { GridSetting } from '../iris-schema';
import { BaseDataService } from '../services/base-data.service';
import { SessionService } from '../services/session.service';

@Component({
  template: ''
})
export abstract class BaseComponent<T> implements OnInit {
  form: FormGroup;
  // gridCol: any = {};
  gridCol: Map<string, GridSetting> = new Map<string, GridSetting>();

  constructor(protected sessionService: SessionService, protected baseService: BaseDataService<T>) {
    this.logNavigation();
  }

  ngOnInit() {
    // this.loadGridWithChanges('list'); // TODO: Hardcoding need to be changed
  }

  protected abstract setEntityInstance(): T;

  protected logError(errorMessage: string) {}

  private logNavigation() {}

  protected gridPageChange(gridName: string, event: PageChangeEvent) {
    const gridSetting = this.gridCol.get(gridName);
    gridSetting.skip = event.skip;
    this.gridCol.set(gridName, gridSetting);
    this.loadGridWithChanges(gridName);
  }

  protected populateGridWithData(gridName: string, gridData: any[]) {
    const gridSetting = this.gridCol.get(gridName);
    gridSetting.gridView = {
      data: gridData.slice(gridSetting.skip, gridSetting.skip + gridSetting.pageSize),
      total: gridData.length
    };
    gridSetting.gridData = clone(gridData);
    this.gridCol.set(gridName, gridSetting);
    this.loadGridWithChanges(gridName);
  }

  protected loadGridWithChanges(gridName: string) {
    const gridSetting = this.gridCol.get(gridName);

    gridSetting.gridView = {
      data: clone(gridSetting.gridData).slice(gridSetting.skip, gridSetting.skip + gridSetting.pageSize),
      total: gridSetting.gridView.total
    };

    this.gridCol.set(gridName, gridSetting);
  }

  protected gridSortChange(gridName: string) {
    console.log(`In the BaseComponent::gridSortChange() function`);
  }
}
