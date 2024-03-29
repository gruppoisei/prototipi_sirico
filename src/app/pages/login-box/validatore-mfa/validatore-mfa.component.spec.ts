import {ComponentFixture, TestBed} from '@angular/core/testing'

import {ValidatoreMFAComponent} from './validatore-mfa.component'

describe('ValidatoreMFAComponent', () => {
  let component: ValidatoreMFAComponent
  let fixture: ComponentFixture<ValidatoreMFAComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValidatoreMFAComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ValidatoreMFAComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
