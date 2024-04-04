import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCercaPersonaComponent } from './dialog-cerca-persona.component';

describe('DialogCercaPersonaComponent', () => {
  let component: DialogCercaPersonaComponent;
  let fixture: ComponentFixture<DialogCercaPersonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogCercaPersonaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogCercaPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
