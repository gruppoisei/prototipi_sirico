import { TestBed } from '@angular/core/testing';

import { PaesiService } from './paesi.service';

describe('PaesiService', () => {
  let service: PaesiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaesiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
