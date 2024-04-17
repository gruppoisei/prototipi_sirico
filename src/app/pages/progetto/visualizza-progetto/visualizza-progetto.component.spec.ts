import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizzaProgettoComponent } from './visualizza-progetto.component';

describe('VisualizzaProgettoComponent', () => {
  let component: VisualizzaProgettoComponent;
  let fixture: ComponentFixture<VisualizzaProgettoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisualizzaProgettoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisualizzaProgettoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
