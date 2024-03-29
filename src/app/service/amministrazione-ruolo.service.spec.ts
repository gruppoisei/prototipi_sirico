import {TestBed} from '@angular/core/testing'

import {AmministrazioneRuoloService} from './amministrazione-ruolo.service'

describe('AmministrazioneRuoloService', () => {
  let service: AmministrazioneRuoloService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(AmministrazioneRuoloService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
