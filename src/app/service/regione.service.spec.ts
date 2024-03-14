import { TestBed } from '@angular/core/testing';

import { RegioneService } from './regione.service';

describe('RegioneService', () => {
  let service: RegioneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegioneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
