import {ComponentFixture, TestBed} from '@angular/core/testing'

import {InsertContrattoComponent} from './insert-contratto.component'

describe('InsertContrattoComponent', () => {
  let component: InsertContrattoComponent
  let fixture: ComponentFixture<InsertContrattoComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsertContrattoComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(InsertContrattoComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
