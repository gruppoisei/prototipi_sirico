import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaRicercaSegnalazioniComponent } from './pagina-ricerca-segnalazioni.component';

describe('PaginaRicercaSegnalazioniComponent', () => {
  let component: PaginaRicercaSegnalazioniComponent;
  let fixture: ComponentFixture<PaginaRicercaSegnalazioniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginaRicercaSegnalazioniComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginaRicercaSegnalazioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
