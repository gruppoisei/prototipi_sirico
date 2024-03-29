import {ComponentFixture, TestBed} from '@angular/core/testing'

import {InsertPersonaProvaComponent} from './insert-persona-prova.component'

describe('InsertPersonaComponent', () => {
  let component: InsertPersonaProvaComponent
  let fixture: ComponentFixture<InsertPersonaProvaComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsertPersonaProvaComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(InsertPersonaProvaComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
