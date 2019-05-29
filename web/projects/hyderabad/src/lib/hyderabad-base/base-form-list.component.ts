import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SelectEvent } from '@progress/kendo-angular-layout/dist/es2015/tabstrip/tabstrip-events';
import { SessionService } from 'hyderabad-common';
import * as R from 'ramda';
import { GridSetting } from '../iris-schema';
import { BaseDataService } from './base-data.service';

@Component({ template: '' })
export abstract class BaseFormListComponent<T> implements OnInit {
  protected tabValues = [];
  protected searchCriteria: any = {};
  protected sessionService: SessionService;
  protected activatedRoute: ActivatedRoute;
  protected fb: FormBuilder;
  protected gridSettings: Map<string, GridSetting> = new Map();

  constructor(protected injector: Injector, protected baseService: BaseDataService<T>) {
    this.sessionService = this.injector.get(SessionService);
    this.activatedRoute = this.injector.get(ActivatedRoute);
    this.fb = this.injector.get(FormBuilder);
  }

  protected setEntityInstance(data: any = {}): T {
    return {} as T;
  }

  ngOnInit() {
    this.searchCriteria = this.setEntityInstance();
    this.initializeGrids();
    this.activatedRoute.data.subscribe((data: { data: T[] }) => {
      this.loadGrids(data.data);
    });
  }

  abstract initializeGrids();

  loadGrids(data: any[]) {
    this.gridSettings.forEach(gridSetting => this.loadIndividualGrid(gridSetting, data));
  }

  loadIndividualGrid(gridSetting: GridSetting, data: any[]): void {
    gridSetting.skip = 0;
    gridSetting.gridView = {
      data: R.clone(data).slice(gridSetting.skip, gridSetting.skip + gridSetting.pageSize),
      total: data.length
    };
    gridSetting.gridData = data;
  }

  onTabSelect(event: SelectEvent) {
    this.searchCriteria.selectedTab = this.tabValues[event.index];
    this.baseService.search(this.searchCriteria).subscribe(data => this.loadGrids(data));
  }
}
