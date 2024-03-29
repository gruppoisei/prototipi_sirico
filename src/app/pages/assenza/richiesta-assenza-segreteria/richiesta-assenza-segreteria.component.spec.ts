import {ComponentFixture, TestBed} from '@angular/core/testing'

import {RichiestaAssenzaSegreteriaComponent} from './richiesta-assenza-segreteria.component'

describe('RichiestaAssenzaSegreteriaComponent', () => {
  let component: RichiestaAssenzaSegreteriaComponent
  let fixture: ComponentFixture<RichiestaAssenzaSegreteriaComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RichiestaAssenzaSegreteriaComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(RichiestaAssenzaSegreteriaComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
