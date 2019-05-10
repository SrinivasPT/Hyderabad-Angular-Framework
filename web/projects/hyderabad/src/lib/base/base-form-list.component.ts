import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectEvent } from '@progress/kendo-angular-layout/dist/es2015/tabstrip/tabstrip-events';
import { BaseComponent, BaseDataService, GridSetting, SessionService } from 'hyderabad';
import * as R from 'ramda';

export abstract class BaseFormListComponent<T> extends BaseComponent<T> implements OnInit {
  // form: FormGroup;
  gridSettings: GridSetting = new GridSetting();
  tabValues = [];
  searchCriteria: any = {};
  fb = this.sessionService.fb;

  constructor(
    protected sessionService: SessionService,
    protected baseService: BaseDataService<T>,
    protected activatedRoute: ActivatedRoute
  ) {
    super(sessionService, baseService);
    this.searchCriteria = this.setEntityInstance();
  }

  ngOnInit() {
    super.ngOnInit();
    // this.form = this.fb.group({ ...this.gridData });

    this.activatedRoute.data.subscribe((data: { data: T[] }) => {
      this.reloadGrid(data.data);
      // this.gridData = data.data;
      // this.originalGridData = Object.assign({}, this.gridData);
      // this.form.patchValue(this.gridData);
      // TODO: How do we know tha grid name is list only. What will happen in the case of multiple grids?
      // this.populateGridWithData('list', this.gridData);
    });
  }

  reloadGrid(data: any[]) {
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
