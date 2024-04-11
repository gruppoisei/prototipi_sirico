import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungiStraordinarioComponent } from './aggiungi-straordinario.component';

describe('AggiungiStraordinarioComponent', () => {
  let component: AggiungiStraordinarioComponent;
  let fixture: ComponentFixture<AggiungiStraordinarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AggiungiStraordinarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AggiungiStraordinarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
