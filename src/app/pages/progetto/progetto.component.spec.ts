import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgettoComponent } from './progetto.component';

describe('ProgettoComponent', () => {
  let component: ProgettoComponent;
  let fixture: ComponentFixture<ProgettoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgettoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgettoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
