import { TestBed } from '@angular/core/testing';

import { RapportinoService } from './rapportino.service';

describe('RapportinoService', () => {
  let service: RapportinoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RapportinoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
