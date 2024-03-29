import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RichiestaAssenzaUtenteComponent } from './richiesta-assenza-utente.component';

describe('RichiestaAssenzaUtenteComponent', () => {
  let component: RichiestaAssenzaUtenteComponent;
  let fixture: ComponentFixture<RichiestaAssenzaUtenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RichiestaAssenzaUtenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RichiestaAssenzaUtenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
