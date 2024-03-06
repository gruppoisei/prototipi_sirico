import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAttivitaComponent } from './lista-attivita.component';

describe('ListaAttivitaComponent', () => {
  let component: ListaAttivitaComponent;
  let fixture: ComponentFixture<ListaAttivitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaAttivitaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaAttivitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
