import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilityCostiPersonaleComponent } from './utility-costi-personale.component';

describe('UtilityCostiPersonaleComponent', () => {
  let component: UtilityCostiPersonaleComponent;
  let fixture: ComponentFixture<UtilityCostiPersonaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UtilityCostiPersonaleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UtilityCostiPersonaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
