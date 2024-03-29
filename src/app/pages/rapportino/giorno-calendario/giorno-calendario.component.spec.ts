import {ComponentFixture, TestBed} from '@angular/core/testing'

import {GiornoCalendarioComponent} from './giorno-calendario.component'

describe('GiornoCalendarioComponent', () => {
  let component: GiornoCalendarioComponent
  let fixture: ComponentFixture<GiornoCalendarioComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GiornoCalendarioComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(GiornoCalendarioComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
