import {ComponentFixture, TestBed} from '@angular/core/testing'

import {GestioneRuoloUtenteComponent} from './gestione-utente-ruolo.component'

describe('GestioneRuoloUtenteComponent', () => {
  let component: GestioneRuoloUtenteComponent
  let fixture: ComponentFixture<GestioneRuoloUtenteComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestioneRuoloUtenteComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(GestioneRuoloUtenteComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
