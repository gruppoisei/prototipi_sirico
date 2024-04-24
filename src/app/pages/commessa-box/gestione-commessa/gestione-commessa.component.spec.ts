import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioneCommessaComponent } from './gestione-commessa.component';

describe('GestioneCommessaComponent', () => {
  let component: GestioneCommessaComponent;
  let fixture: ComponentFixture<GestioneCommessaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestioneCommessaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestioneCommessaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
