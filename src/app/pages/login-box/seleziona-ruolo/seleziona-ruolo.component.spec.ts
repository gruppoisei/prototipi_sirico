import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelezionaRuoloComponent } from './seleziona-ruolo.component';

describe('SelezionaRuoloComponent', () => {
  let component: SelezionaRuoloComponent;
  let fixture: ComponentFixture<SelezionaRuoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelezionaRuoloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelezionaRuoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
