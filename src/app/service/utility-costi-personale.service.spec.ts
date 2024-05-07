import { TestBed } from '@angular/core/testing';

import { UtilityCostiPersonaleService } from './utility-costi-personale.service';

describe('UtilityCostiPersonaleService', () => {
  let service: UtilityCostiPersonaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilityCostiPersonaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
