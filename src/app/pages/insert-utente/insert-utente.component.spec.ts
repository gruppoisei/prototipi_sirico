import {ComponentFixture, TestBed} from '@angular/core/testing'

import {InsertUtenteComponent} from './insert-utente.component'

describe('InsertUtenteComponent', () => {
  let component: InsertUtenteComponent
  let fixture: ComponentFixture<InsertUtenteComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsertUtenteComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(InsertUtenteComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
