import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttivitaGiornoComponent } from './attivita-giorno.component';

describe('AttivitaGiornoComponent', () => {
  let component: AttivitaGiornoComponent;
  let fixture: ComponentFixture<AttivitaGiornoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttivitaGiornoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttivitaGiornoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
