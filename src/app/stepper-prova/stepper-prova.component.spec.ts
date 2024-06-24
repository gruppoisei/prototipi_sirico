import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperProvaComponent } from './stepper-prova.component';

describe('StepperProvaComponent', () => {
  let component: StepperProvaComponent;
  let fixture: ComponentFixture<StepperProvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StepperProvaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StepperProvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
