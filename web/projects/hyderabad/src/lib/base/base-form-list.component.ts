import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectEvent } from '@progress/kendo-angular-layout/dist/es2015/tabstrip/tabstrip-events';
import { BaseComponent, BaseDataService, GridSetting, SessionService } from 'hyderabad';
import * as R from 'ramda';

export abstract class BaseFormListComponent<T> extends BaseComponent<T> implements OnInit {
  // form: FormGroup;
  tabValues = [];
  searchCriteria: any = {};
  fb = this.sessionService.fb;
  gridSettings: GridSetting = new GridSetting();

  constructor(
    protected sessionService: SessionService,
    protected baseService: BaseDataService<T>,
    protected activatedRoute: ActivatedRoute
  ) {
    super();
    this.searchCriteria = this.setEntityInstance();
  }

  ngOnInit() {
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
