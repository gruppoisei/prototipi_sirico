import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CercaPersonaSenzaUtenteComponent } from './cerca-persona-senza-utente.component';

describe('CercaPersonaSenzaUtenteComponent', () => {
  let component: CercaPersonaSenzaUtenteComponent;
  let fixture: ComponentFixture<CercaPersonaSenzaUtenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CercaPersonaSenzaUtenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CercaPersonaSenzaUtenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
