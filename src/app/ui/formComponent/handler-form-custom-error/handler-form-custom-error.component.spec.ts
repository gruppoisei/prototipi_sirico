import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandlerFormCustomErrorComponent } from './handler-form-custom-error.component';

describe('HandlerFormCustomErrorComponent', () => {
  let component: HandlerFormCustomErrorComponent;
  let fixture: ComponentFixture<HandlerFormCustomErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HandlerFormCustomErrorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HandlerFormCustomErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
