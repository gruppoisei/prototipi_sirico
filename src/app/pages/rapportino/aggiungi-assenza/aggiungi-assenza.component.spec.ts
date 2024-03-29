import {ComponentFixture, TestBed} from '@angular/core/testing'

import {AggiungiAssenzaComponent} from './aggiungi-assenza.component'

describe('AggiungiAssenzaComponent', () => {
  let component: AggiungiAssenzaComponent
  let fixture: ComponentFixture<AggiungiAssenzaComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AggiungiAssenzaComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(AggiungiAssenzaComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
