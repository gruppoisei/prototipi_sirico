import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalvaCommessaComponent } from './salva-commessa.component';

describe('SalvaCommessaComponent', () => {
  let component: SalvaCommessaComponent;
  let fixture: ComponentFixture<SalvaCommessaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalvaCommessaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalvaCommessaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
