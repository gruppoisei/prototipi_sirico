import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungiOrdinarioComponent } from './aggiungi-ordinario.component';

describe('AggiungiOrdinarioComponent', () => {
  let component: AggiungiOrdinarioComponent;
  let fixture: ComponentFixture<AggiungiOrdinarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AggiungiOrdinarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AggiungiOrdinarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
