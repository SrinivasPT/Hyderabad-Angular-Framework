import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BaseService } from 'projects/hyderabad/src/lib/services/base.service';

@Injectable({ providedIn: 'root' })
export class PersonService extends BaseService<modal.Person> {
  constructor(protected http: HttpClient) {
    super(http);
  }
}
