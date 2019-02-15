import { TestBed } from '@angular/core/testing';

import { HyderabadService } from './hyderabad.service';

describe('HyderabadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HyderabadService = TestBed.get(HyderabadService);
    expect(service).toBeTruthy();
  });
});
