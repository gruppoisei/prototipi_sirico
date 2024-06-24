import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperDialogCreazioneAspettoComponent } from './stepper-dialog-creazione-aspetto.component';

describe('StepperDialogCreazioneAspettoComponent', () => {
  let component: StepperDialogCreazioneAspettoComponent;
  let fixture: ComponentFixture<StepperDialogCreazioneAspettoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StepperDialogCreazioneAspettoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StepperDialogCreazioneAspettoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
