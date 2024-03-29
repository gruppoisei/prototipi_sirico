import {ComponentFixture, TestBed} from '@angular/core/testing'

import {ResponseResetPasswordDialogComponent} from './response-reset-password-dialog.component'

describe('ResponseResetPasswordDialogComponent', () => {
  let component: ResponseResetPasswordDialogComponent
  let fixture: ComponentFixture<ResponseResetPasswordDialogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResponseResetPasswordDialogComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ResponseResetPasswordDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
