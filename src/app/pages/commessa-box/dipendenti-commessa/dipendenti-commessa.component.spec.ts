import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DipendentiCommessaComponent } from './dipendenti-commessa.component';

describe('DipendentiCommessaComponent', () => {
  let component: DipendentiCommessaComponent;
  let fixture: ComponentFixture<DipendentiCommessaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DipendentiCommessaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DipendentiCommessaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
