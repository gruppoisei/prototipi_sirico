import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegreteriaComponent } from './segreteria.component';

describe('SegreteriaComponent', () => {
  let component: SegreteriaComponent;
  let fixture: ComponentFixture<SegreteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SegreteriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SegreteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
