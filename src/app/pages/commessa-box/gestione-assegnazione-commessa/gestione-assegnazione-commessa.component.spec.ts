import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioneAssegnazioneCommessaComponent } from './gestione-assegnazione-commessa.component';

describe('GestioneAssegnazioneCommessaComponent', () => {
  let component: GestioneAssegnazioneCommessaComponent;
  let fixture: ComponentFixture<GestioneAssegnazioneCommessaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestioneAssegnazioneCommessaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestioneAssegnazioneCommessaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
