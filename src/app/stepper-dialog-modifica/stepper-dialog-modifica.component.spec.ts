import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperDialogModificaComponent } from './stepper-dialog-modifica.component';

describe('StepperDialogModificaComponent', () => {
  let component: StepperDialogModificaComponent;
  let fixture: ComponentFixture<StepperDialogModificaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StepperDialogModificaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StepperDialogModificaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
