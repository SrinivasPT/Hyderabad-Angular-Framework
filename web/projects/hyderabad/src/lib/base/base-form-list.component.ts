import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent, BaseDataService, SessionService } from 'hyderabad';

export abstract class BaseFormListComponent<T> extends BaseComponent<T> implements OnInit {
  // form: FormGroup;
  gridData: T[] = [];
  originalGridData: T[];
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
    this.form = this.fb.group({ ...this.gridData });

    this.activatedRoute.data.subscribe((data: { data: T[] }) => {
      this.gridData = data.data;
      this.originalGridData = Object.assign({}, this.gridData);
      this.form.patchValue(this.gridData);

      // TODO: How do we know tha grid name is list only. What will happen in the case of multiple grids?
      this.populateGridWithData('list', this.gridData);
    });
  }
}
