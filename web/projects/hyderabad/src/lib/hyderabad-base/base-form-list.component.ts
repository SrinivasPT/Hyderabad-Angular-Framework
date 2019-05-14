import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SelectEvent } from '@progress/kendo-angular-layout/dist/es2015/tabstrip/tabstrip-events';
import { SessionService } from 'hyderabad-common';
import * as R from 'ramda';
import { GridSetting } from '../iris-schema';
import { BaseDataService } from './base-data.service';
import { BaseComponent } from './base.component';

@Component({ template: '' })
export class BaseFormListComponent<T> extends BaseComponent<T> implements OnInit {
  protected tabValues = [];
  protected searchCriteria: any = {};
  protected sessionService: SessionService;
  protected activatedRoute: ActivatedRoute;
  protected fb: FormBuilder;
  protected gridSettings: GridSetting = new GridSetting();

  constructor(protected injector: Injector, protected baseService: BaseDataService<T>) {
    super();
    this.sessionService = this.injector.get(SessionService);
    this.activatedRoute = this.injector.get(ActivatedRoute);
    this.fb = this.injector.get(FormBuilder);
  }

  ngOnInit() {
    this.searchCriteria = this.setEntityInstance();
    this.activatedRoute.data.subscribe((data: { data: T[] }) => {
      this.reloadGrid(data.data);
    });
  }

  reloadGrid(data: any[]) {
    this.gridSettings.skip = 0;
    this.gridSettings.gridView = {
      data: R.clone(data).slice(this.gridSettings.skip, this.gridSettings.skip + this.gridSettings.pageSize),
      total: data.length
    };
    this.gridSettings.gridData = data;
  }

  onTabSelect(event: SelectEvent) {
    this.searchCriteria.selectedTab = this.tabValues[event.index];
    this.baseService.search(this.searchCriteria).subscribe(data => this.reloadGrid(data));
  }
}
