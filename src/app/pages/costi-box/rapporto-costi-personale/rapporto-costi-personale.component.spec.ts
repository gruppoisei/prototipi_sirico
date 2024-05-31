import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportoCostiPersonaleComponent } from './rapporto-costi-personale.component';

describe('RapportoCostiPersonaleComponent', () => {
  let component: RapportoCostiPersonaleComponent;
  let fixture: ComponentFixture<RapportoCostiPersonaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RapportoCostiPersonaleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RapportoCostiPersonaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
