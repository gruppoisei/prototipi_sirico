import {ComponentFixture, TestBed} from '@angular/core/testing'

import {InsertPersonaComponent} from './insert-persona.component'

describe('InsertPersonaComponent', () => {
  let component: InsertPersonaComponent
  let fixture: ComponentFixture<InsertPersonaComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsertPersonaComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(InsertPersonaComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
