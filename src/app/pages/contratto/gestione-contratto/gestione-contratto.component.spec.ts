import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioneContrattoComponent } from './gestione-contratto.component';

describe('GestioneContrattoComponent', () => {
  let component: GestioneContrattoComponent;
  let fixture: ComponentFixture<GestioneContrattoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestioneContrattoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestioneContrattoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
