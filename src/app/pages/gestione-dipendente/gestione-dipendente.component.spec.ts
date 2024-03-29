import {ComponentFixture, TestBed} from '@angular/core/testing'

import {GestioneDipendenteComponent} from './gestione-dipendente.component'

describe('GestioneDipendenteComponent', () => {
  let component: GestioneDipendenteComponent
  let fixture: ComponentFixture<GestioneDipendenteComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestioneDipendenteComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(GestioneDipendenteComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
