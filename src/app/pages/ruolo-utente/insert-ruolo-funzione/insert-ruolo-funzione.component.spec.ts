import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertRuoloFunzioneComponent } from './insert-ruolo-funzione.component';

describe('InsertRuoloFunzioneComponent', () => {
  let component: InsertRuoloFunzioneComponent;
  let fixture: ComponentFixture<InsertRuoloFunzioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsertRuoloFunzioneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsertRuoloFunzioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
