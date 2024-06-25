import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaRisolviAspettoComponent } from './pagina-risolvi-aspetto.component';

describe('PaginaRisolviAspettoComponent', () => {
  let component: PaginaRisolviAspettoComponent;
  let fixture: ComponentFixture<PaginaRisolviAspettoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginaRisolviAspettoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginaRisolviAspettoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
