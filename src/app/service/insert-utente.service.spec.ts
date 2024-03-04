import { TestBed } from '@angular/core/testing';

import { InsertUtenteService } from './insert-utente.service';

describe('InsertUtenteService', () => {
  let service: InsertUtenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsertUtenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
