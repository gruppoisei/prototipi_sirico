import {ComponentFixture, TestBed} from '@angular/core/testing'

import {NewPasswordResponseDialogComponent} from './new-password-response-dialog.component'

describe('NewPasswordResponseDialogComponent', () => {
  let component: NewPasswordResponseDialogComponent
  let fixture: ComponentFixture<NewPasswordResponseDialogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewPasswordResponseDialogComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(NewPasswordResponseDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
