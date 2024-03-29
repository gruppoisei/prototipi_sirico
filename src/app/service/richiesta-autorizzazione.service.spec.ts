import { TestBed } from '@angular/core/testing';

import { RichiestaAutorizzazioneService } from './richiesta-autorizzazione.service';

describe('RichiestaAutorizzazioneService', () => {
  let service: RichiestaAutorizzazioneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RichiestaAutorizzazioneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
