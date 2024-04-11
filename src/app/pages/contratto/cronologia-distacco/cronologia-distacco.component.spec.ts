import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CronologiaDistaccoComponent } from './cronologia-distacco.component';

describe('CronologiaDistaccoComponent', () => {
  let component: CronologiaDistaccoComponent;
  let fixture: ComponentFixture<CronologiaDistaccoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CronologiaDistaccoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CronologiaDistaccoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
