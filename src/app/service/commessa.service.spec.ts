import { TestBed } from '@angular/core/testing';

import { CommessaService } from './commessa.service';

describe('CommessaService', () => {
  let service: CommessaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommessaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
