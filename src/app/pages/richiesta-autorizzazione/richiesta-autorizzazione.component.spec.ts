import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RichiestaAutorizzazioneComponent } from './richiesta-autorizzazione.component';

describe('RichiestaAutorizzazioneComponent', () => {
  let component: RichiestaAutorizzazioneComponent;
  let fixture: ComponentFixture<RichiestaAutorizzazioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RichiestaAutorizzazioneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RichiestaAutorizzazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
