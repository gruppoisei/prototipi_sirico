import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertRuoloUtenteComponent } from './insert-ruolo-utente.component';

describe('InsertRuoloUtenteComponent', () => {
  let component: InsertRuoloUtenteComponent;
  let fixture: ComponentFixture<InsertRuoloUtenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsertRuoloUtenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsertRuoloUtenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
