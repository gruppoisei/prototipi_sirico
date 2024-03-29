import {ComponentFixture, TestBed} from '@angular/core/testing'

import {AggiungiReperibilitaComponent} from './aggiungi-reperibilita.component'

describe('AggiungiReperibilitaComponent', () => {
  let component: AggiungiReperibilitaComponent
  let fixture: ComponentFixture<AggiungiReperibilitaComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AggiungiReperibilitaComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(AggiungiReperibilitaComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
