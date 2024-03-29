import {ComponentFixture, TestBed} from '@angular/core/testing'

import {CopiaGiornoDialogComponent} from './copia-giorno-dialog.component'

describe('CopiaGiornoDialogComponent', () => {
  let component: CopiaGiornoDialogComponent
  let fixture: ComponentFixture<CopiaGiornoDialogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CopiaGiornoDialogComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(CopiaGiornoDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
