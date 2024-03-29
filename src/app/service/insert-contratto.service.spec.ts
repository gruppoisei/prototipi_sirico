import {TestBed} from '@angular/core/testing'

import {InsertContrattoService} from './insert-contratto.service'

describe('InsertContrattoService', () => {
  let service: InsertContrattoService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(InsertContrattoService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
