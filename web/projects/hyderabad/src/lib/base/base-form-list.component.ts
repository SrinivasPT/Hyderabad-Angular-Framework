import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent, BaseDataService, SessionService } from 'hyderabad';

export abstract class BaseFormListComponent<T> extends BaseComponent<T> implements OnInit {
  form: FormGroup;
  gridData: T[];
  originalGridData: T[];
  fb = this.sessionService.fb;

  constructor(
    protected sessionService: SessionService,
    protected baseService: BaseDataService<T>,
    protected activatedRoute: ActivatedRoute
  ) {
    super(sessionService, baseService);
    this.gridData = this.setEntityInstance();
  }

  protected abstract setEntityInstance(): T[];

  ngOnInit() {
    this.form = this.fb.group({ ...this.gridData });

    this.activatedRoute.data.subscribe((data: { data: T[] }) => {
      this.gridData = data.data;
      this.originalGridData = Object.assign({}, this.gridData);
      this.form.patchValue(this.gridData);
    });
  }
}
